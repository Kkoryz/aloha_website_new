#!/usr/bin/env bash
# =============================================================================
# alohaandco.com 静态站部署脚本（React SPA + Nginx）
# 适用系统：Ubuntu 24.04 LTS
# 用法：将此脚本和 dist/ 目录一起上传到服务器后运行
#   scp -r dist deploy-droplet.sh root@67.205.140.98:/root/
#   ssh root@67.205.140.98 "bash /root/deploy-droplet.sh"
# =============================================================================

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

info()    { echo -e "${BLUE}[INFO]${NC}  $*"; }
success() { echo -e "${GREEN}[ OK ]${NC}  $*"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}  $*"; }
error()   { echo -e "${RED}[ERR]${NC}  $*"; exit 1; }
step()    { echo -e "\n${BOLD}${CYAN}── $* ──${NC}"; }

[[ $EUID -ne 0 ]] && error "请以 root 运行：sudo bash deploy-droplet.sh"

DOMAIN="alohaandco.com"
WWW_DOMAIN="www.alohaandco.com"
WEBROOT="/var/www/${DOMAIN}"
DIST_SOURCE="/root/dist"
TIMEZONE="America/Toronto"
LOG_FILE="/root/deploy-alohaandco.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo ""
echo -e "${BOLD}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}║   alohaandco.com · React SPA 部署到 Droplet       ║${NC}"
echo -e "${BOLD}╚════════════════════════════════════════════════════╝${NC}"
echo ""
info "开始时间：$(date '+%Y-%m-%d %H:%M:%S')"

# 检查 dist 目录是否存在
[[ ! -d "${DIST_SOURCE}" ]] && error "找不到 ${DIST_SOURCE} 目录，请先上传 dist/"
[[ ! -f "${DIST_SOURCE}/index.html" ]] && error "${DIST_SOURCE}/index.html 不存在，dist 构建不完整"

# ═════════════════════════════════════════════════════════════════════════════
# 1. 系统基础
# ═════════════════════════════════════════════════════════════════════════════
step "1/6 系统更新与基础工具"

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get upgrade -y -qq
apt-get install -y -qq curl wget unzip git ufw fail2ban

timedatectl set-timezone "${TIMEZONE}"

# Swap（1GB）
if ! swapon --show | grep -q '/swapfile'; then
    fallocate -l 1G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    sysctl vm.swappiness=10
    grep -q 'vm.swappiness' /etc/sysctl.conf \
        && sed -i 's/.*vm.swappiness.*/vm.swappiness=10/' /etc/sysctl.conf \
        || echo 'vm.swappiness=10' >> /etc/sysctl.conf
    success "1GB Swap 创建完成"
else
    warn "Swap 已存在，跳过"
fi

success "系统更新完成，时区 ${TIMEZONE}"

# ═════════════════════════════════════════════════════════════════════════════
# 2. Nginx
# ═════════════════════════════════════════════════════════════════════════════
step "2/6 安装并配置 Nginx"

apt-get install -y -qq nginx

# 全局配置
cat > /etc/nginx/nginx.conf << 'EOF'
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 1024;
    multi_accept on;
}

http {
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    access_log /var/log/nginx/access.log;
    error_log  /var/log/nginx/error.log;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
    gzip_types
        text/plain text/css text/xml text/javascript
        application/json application/javascript application/xml
        application/rss+xml application/atom+xml
        image/svg+xml font/truetype font/opentype
        application/vnd.ms-fontobject;

    client_max_body_size 20M;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
EOF

# 站点配置
rm -f /etc/nginx/sites-enabled/default

cat > /etc/nginx/sites-available/${DOMAIN} << 'VHOST'
server {
    listen 80;
    listen [::]:80;
    server_name alohaandco.com www.alohaandco.com;

    root /var/www/alohaandco.com;
    index index.html;

    # ── 安全头 ──
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # ── React SPA：所有路由 fallback 到 index.html ──
    location / {
        try_files $uri $uri/ /index.html;
    }

    # ── 静态资源长缓存（Vite 文件名带 hash，可安全设长期缓存） ──
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # ── 图片、视频、PDF 缓存 ──
    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp|mp4|webm|pdf|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
        access_log off;
    }

    # ── 隐藏文件禁止访问 ──
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    access_log /var/log/nginx/alohaandco.com.access.log;
    error_log  /var/log/nginx/alohaandco.com.error.log;
}
VHOST

ln -sf /etc/nginx/sites-available/${DOMAIN} /etc/nginx/sites-enabled/${DOMAIN}
nginx -t
systemctl enable nginx
systemctl restart nginx
success "Nginx 配置完成（SPA fallback + 静态资源缓存）"

# ═════════════════════════════════════════════════════════════════════════════
# 3. 部署网站文件
# ═════════════════════════════════════════════════════════════════════════════
step "3/6 部署网站文件"

mkdir -p "${WEBROOT}"

# 如果已有旧版本，备份
if [[ -f "${WEBROOT}/index.html" ]]; then
    BACKUP_DIR="/root/backup-alohaandco-$(date +%Y%m%d%H%M%S)"
    cp -r "${WEBROOT}" "${BACKUP_DIR}"
    warn "已备份旧站点到 ${BACKUP_DIR}"
fi

# 清空目标目录并复制新文件
rm -rf "${WEBROOT:?}"/*
cp -r "${DIST_SOURCE}"/* "${WEBROOT}"/

chown -R www-data:www-data "${WEBROOT}"
find "${WEBROOT}" -type d -exec chmod 755 {} \;
find "${WEBROOT}" -type f -exec chmod 644 {} \;

FILE_COUNT=$(find "${WEBROOT}" -type f | wc -l)
DIR_SIZE=$(du -sh "${WEBROOT}" | cut -f1)
success "已部署 ${FILE_COUNT} 个文件（${DIR_SIZE}）到 ${WEBROOT}"

# ═════════════════════════════════════════════════════════════════════════════
# 4. SSL（Let's Encrypt）
# ═════════════════════════════════════════════════════════════════════════════
step "4/6 SSL 证书"

apt-get install -y -qq certbot python3-certbot-nginx

SERVER_IP=$(curl -s --max-time 10 ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')
DOMAIN_IP=$(dig +short "${DOMAIN}" A 2>/dev/null | tail -1 || true)

if [[ "${DOMAIN_IP}" == "${SERVER_IP}" ]]; then
    info "DNS 已生效（${DOMAIN} → ${SERVER_IP}），申请 SSL..."
    certbot --nginx \
        --non-interactive \
        --agree-tos \
        --email "korey@alohaandco.com" \
        -d "${DOMAIN}" \
        -d "${WWW_DOMAIN}" \
        --redirect
    systemctl enable certbot.timer
    systemctl start certbot.timer
    SSL_STATUS="HTTPS 已启用，自动续期已开启"
    success "${SSL_STATUS}"
else
    warn "DNS 未生效（${DOMAIN} → ${DOMAIN_IP:-未解析}，服务器 ${SERVER_IP}）"
    warn "跳过 SSL。DNS 生效后手动运行："
    echo "  certbot --nginx -d ${DOMAIN} -d ${WWW_DOMAIN} --redirect"
    SSL_STATUS="DNS 未生效，SSL 未配置"
fi

# ═════════════════════════════════════════════════════════════════════════════
# 5. 防火墙
# ═════════════════════════════════════════════════════════════════════════════
step "5/6 UFW 防火墙"

ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
success "UFW 已启用：仅开放 22 / 80 / 443"

# ═════════════════════════════════════════════════════════════════════════════
# 6. Fail2ban
# ═════════════════════════════════════════════════════════════════════════════
step "6/6 安全加固"

cat > /etc/fail2ban/jail.local << 'F2B'
[DEFAULT]
bantime  = 3600
findtime = 600
maxretry = 5

[sshd]
enabled = true
port    = ssh

[nginx-http-auth]
enabled = true
F2B

systemctl enable fail2ban
systemctl restart fail2ban
systemctl reload nginx
success "Fail2ban 已配置"

# ═════════════════════════════════════════════════════════════════════════════
# 完成
# ═════════════════════════════════════════════════════════════════════════════
echo ""
echo -e "${BOLD}${GREEN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║             部署完成 · alohaandco.com                     ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║                                                           ║"
echo "║  网站地址：http://alohaandco.com                          ║"
echo "║  文件目录：/var/www/alohaandco.com                        ║"
echo "║  SSL 状态：${SSL_STATUS}                                  ║"
echo "║                                                           ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║  GoDaddy DNS 设置                                         ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║  A    记录：@    → 67.205.140.98                          ║"
echo "║  A    记录：www  → 67.205.140.98                          ║"
echo "║  TTL：600                                                 ║"
echo "║                                                           ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║  后续更新网站只需：                                        ║"
echo "║  本地 npm run build                                       ║"
echo "║  scp -r dist/* root@67.205.140.98:/var/www/alohaandco.com/║"
echo "║                                                           ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║  安装后必做                                                ║"
echo "╠═══════════════════════════════════════════════════════════╣"
echo "║  1. 去 GoDaddy 设置 DNS A 记录                            ║"
echo "║  2. DNS 生效后运行 certbot 申请 SSL（若上方跳过）           ║"
echo "║  3. 修改 root 密码：passwd root                           ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
info "完整日志：${LOG_FILE}"
info "结束时间：$(date '+%Y-%m-%d %H:%M:%S')"

import type { CSSProperties } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  loading?: 'eager' | 'lazy';
  decoding?: 'auto' | 'sync' | 'async';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
};

function toWebp(src: string): string | null {
  if (!src) return null;
  if (src.endsWith('.webp')) return src;
  if (/\.(jpe?g|png)$/i.test(src)) return src.replace(/\.(jpe?g|png)$/i, '.webp');
  return null;
}

export default function Picture({
  src,
  alt,
  className,
  style,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  width,
  height,
}: Props) {
  const webp = toWebp(src);

  return (
    <picture>
      {webp && webp !== src && <source srcSet={webp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
      />
    </picture>
  );
}

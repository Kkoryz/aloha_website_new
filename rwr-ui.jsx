// rwr-ui.jsx — Reusable UI + all section components

function ProgressBar() {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const fn = () => { const m = document.documentElement.scrollHeight - window.innerHeight; setP(m > 0 ? (window.scrollY / m) * 100 : 0); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return React.createElement('div', { className:'progress-bar', style:{ width: p + '%' } });
}

function Sidebar({ active }) {
  const go = id => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 20, behavior:'smooth' }); };
  return React.createElement('nav', { className:'sidebar' },
    React.createElement('div', { className:'sidebar-logo' },
      React.createElement('span', { className:'sidebar-logo-label' }, 'Market Report · 2026'),
      React.createElement('div', { className:'sidebar-logo-title' }, 'Aloha & Co.', React.createElement('br'), 'Brand Guide')
    ),
    window.NAV.map(item =>
      React.createElement('button', { key:item.id, className:`nav-item${active===item.id?' active':''}`, onClick:()=>go(item.id) },
        React.createElement('span', { className:'nav-num' }, item.num),
        React.createElement('span', { className:'nav-dot' }),
        item.label
      )
    )
  );
}

function Counter({ value }) {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null); const started = React.useRef(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const tgt = parseFloat(value); let cur = 0; const inc = tgt / (1100 / 16);
        const t = setInterval(() => { cur += inc; if (cur >= tgt) { setN(tgt); clearInterval(t); } else setN(cur); }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  const d = parseFloat(value) % 1 !== 0 ? n.toFixed(1) : Math.round(n).toLocaleString();
  return React.createElement('span', { ref }, d);
}

function BarChart({ data }) {
  const ref = React.useRef(null); const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return React.createElement('div', { className:'bar-chart', ref },
    data.map((d, i) =>
      React.createElement('div', { className:'bar-row', key:i },
        React.createElement('div', { className:'bar-lbl' }, d.label),
        React.createElement('div', { className:'bar-track' },
          React.createElement('div', { className:'bar-fill', style:{ width:(vis?d.pct:0)+'%', transitionDelay:i*0.08+'s' } },
            React.createElement('span', { className:'bar-val' }, d.value)
          )
        )
      )
    )
  );
}

function SectionHeader({ tag, title, lead }) {
  return React.createElement('div', { className:'section-header' },
    React.createElement('div', { className:'section-tag' }, tag),
    React.createElement('h2', { className:'section-title', dangerouslySetInnerHTML:{ __html: title } }),
    lead && React.createElement('p', { className:'section-lead' }, lead)
  );
}

function PullQuote({ text, attr }) {
  return React.createElement('div', { className:'pull-quote' },
    React.createElement('div', { className:'pull-quote-text' }, text),
    attr && React.createElement('span', { className:'pull-quote-attr' }, attr)
  );
}

function RTable({ head, rows, style }) {
  return React.createElement('table', { className:'report-table', style },
    React.createElement('thead', null, React.createElement('tr', null, head.map((h,i) => React.createElement('th', { key:i }, h)))),
    React.createElement('tbody', null, rows.map((row, i) =>
      React.createElement('tr', { key:i }, row.map((cell, j) =>
        React.createElement('td', { key:j, className: j===0?'':'', style: j>0?{ color:'var(--ash)', fontSize:13 }:{} }, cell)
      ))
    ))
  );
}

// ── Section Components ────────────────────────────────────────────────────────

function LifecycleSection() {
  const [active, setActive] = React.useState(0);
  return React.createElement('div', null,
    React.createElement('div', { className:'lifecycle-strip' },
      window.STAGES.map((s, i) =>
        React.createElement('div', { key:i, className:`l-stage${active===i?' on':''}`, onClick:()=>setActive(i) },
          React.createElement('span', { className:'l-num' }, s.num),
          React.createElement('div', { className:'l-name' }, s.name),
          React.createElement('div', { className:'l-q' }, s.q)
        )
      )
    ),
    React.createElement('div', { className:'l-detail' },
      React.createElement('div', { className:'l-detail-name' }, window.STAGES[active].name),
      React.createElement('div', { className:'l-detail-role' }, window.STAGES[active].role)
    )
  );
}

function CustomerSection() {
  const [active, setActive] = React.useState(0);
  const c = window.CUSTOMERS[active];
  return React.createElement('div', null,
    React.createElement('div', { className:'cust-tabs' },
      window.CUSTOMERS.map((cu, i) =>
        React.createElement('button', { key:i, className:`cust-tab${active===i?' on':''}`, onClick:()=>setActive(i) }, cu.label)
      )
    ),
    React.createElement('div', { className:'cust-body' },
      React.createElement('p', { className:'cust-desc' }, c.desc),
      React.createElement('div', { className:'j-header' },
        React.createElement('span', null, 'Moment'),
        React.createElement('span', null, 'What they are thinking'),
        React.createElement('span', null, 'Product & merchandising implication')
      ),
      c.rows.map((r, i) =>
        React.createElement('div', { className:'j-row', key:i },
          React.createElement('div', { className:'j-moment' }, r.m),
          React.createElement('div', { className:'j-think' }, r.t),
          React.createElement('div', { className:'j-product' }, r.p)
        )
      )
    )
  );
}

function ThemesSection() {
  return React.createElement('div', { className:'themes-grid' },
    window.THEMES.map((t, i) =>
      React.createElement('div', { key:i, className:`theme-card${i===0?' featured':''}` },
        React.createElement('span', { className:'th-num' }, t.num),
        React.createElement('div', { className:'th-title' }, t.title),
        React.createElement('div', { className:'th-body' }, t.body),
        React.createElement('div', { className:'th-tags' },
          t.tags.map((tg, j) => React.createElement('span', { className:'th-tag', key:j }, tg))
        )
      )
    )
  );
}

function ArchetypesSection() {
  return React.createElement('div', { className:'archetype-grid' },
    window.ARCHETYPES.map((a, i) =>
      React.createElement('div', { key:i, className:`archetype-card${i===0?' arch-hero':''}` },
        React.createElement('div', { className:'arch-num' }, `0${i+1}`),
        React.createElement('div', { className:'arch-label' }, a.label),
        React.createElement('div', { className:'arch-meta' },
          React.createElement('span', { className:'arch-age' }, a.age),
          React.createElement('span', { className:'arch-budget' }, a.budget)
        ),
        React.createElement('div', { className:'arch-motivation' }, a.motivation),
        React.createElement('div', { className:'arch-product-label' }, 'Product'),
        React.createElement('div', { className:'arch-product' }, a.product),
        React.createElement('div', { className:'arch-channel-label' }, 'Channel'),
        React.createElement('div', { className:'arch-channel' }, a.channel)
      )
    )
  );
}

function ChannelsSection() {
  const [open, setOpen] = React.useState(null);
  return React.createElement('div', { className:'channel-grid' },
    window.CHANNELS.map((c, i) =>
      React.createElement('div', { key:i, className:`channel-card${open===i?' open':''}`, onClick:()=>setOpen(open===i?null:i) },
        React.createElement('div', { className:'ch-head' },
          React.createElement('div', { className:'ch-label' }, c.label),
          React.createElement('div', { className:'ch-customer' }, c.customer),
          React.createElement('div', { className:'ch-price' }, c.price)
        ),
        open===i && React.createElement('div', { className:'ch-detail' },
          React.createElement('div', { className:'ch-detail-row' },
            React.createElement('span', { className:'ch-detail-label' }, 'Display logic'),
            React.createElement('span', { className:'ch-detail-val' }, c.display)
          ),
          React.createElement('div', { className:'ch-detail-row' },
            React.createElement('span', { className:'ch-detail-label' }, 'Pitch'),
            React.createElement('span', { className:'ch-detail-val' }, c.pitch)
          ),
          React.createElement('div', { className:'ch-detail-row' },
            React.createElement('span', { className:'ch-detail-label' }, 'Reorder'),
            React.createElement('span', { className:'ch-detail-val' }, c.reorder)
          )
        ),
        React.createElement('div', { className:'ch-toggle' }, open===i ? '↑ Close' : '↓ Expand')
      )
    )
  );
}

function RiskSection() {
  return React.createElement('div', { className:'risk-grid' },
    window.RISKS.map((r, i) =>
      React.createElement('div', { key:i, className:`risk-card ${r.severity.toLowerCase()}` },
        React.createElement('div', { className:'risk-severity' }, r.severity),
        React.createElement('div', { className:'risk-name' }, r.name),
        React.createElement('div', { className:'risk-desc' }, r.desc),
        React.createElement('div', { className:'risk-mit' }, r.mitigation),
        React.createElement('div', { className:'risk-kpi' }, '↗ ' + r.kpi)
      )
    )
  );
}

function ScenarioSection() {
  return React.createElement('div', { className:'scenario-grid' },
    window.SCENARIOS.map((s, i) =>
      React.createElement('div', { key:i, className:`sc-card sc-${i}` },
        React.createElement('span', { className:'sc-label' }, s.label),
        React.createElement('div', { className:'sc-tagline' }, s.tagline),
        React.createElement('div', { className:'sc-conditions' },
          s.conditions.map((c, j) => React.createElement('div', { key:j, className:'sc-item' }, c))
        ),
        React.createElement('div', { className:'sc-strategy-wrap' },
          React.createElement('div', { className:'sc-strategy-label' }, 'Strategy'),
          React.createElement('div', { className:'sc-strategy' }, s.strategy)
        ),
        React.createElement('div', { className:'sc-budget' }, s.budget)
      )
    )
  );
}

function MetricsSection() {
  return React.createElement('div', { className:'metrics-grid' },
    window.METRICS.map((m, i) =>
      React.createElement('div', { key:i, className:`metric-card${i===0?' metric-hero':''}` },
        React.createElement('div', { className:'metric-name' }, m.name),
        React.createElement('div', { className:'metric-formula' }, m.formula),
        React.createElement('div', { className:'metric-target' }, m.target),
        React.createElement('div', { className:'metric-why' }, m.why)
      )
    )
  );
}

function AgendaSection() {
  return React.createElement('div', { className:'agenda-grid' },
    window.AGENDA.map((a, i) =>
      React.createElement('div', { key:i, className:`agenda-phase ag-${i}` },
        React.createElement('span', { className:'ag-window' }, a.window),
        React.createElement('div', { className:'ag-phase' }, a.phase),
        a.items.map((item, j) => React.createElement('div', { key:j, className:'ag-item' }, item))
      )
    )
  );
}

function PlaybookSection() {
  return React.createElement('div', { className:'playbook-steps' },
    window.PLAYBOOK.map((s, i) =>
      React.createElement('div', { key:i, className:'pb-step' },
        React.createElement('div', { className:'pb-num' }, `0${i+1}`),
        React.createElement('div', null,
          React.createElement('div', { className:'pb-title' }, s.title),
          React.createElement('div', { className:'pb-body' },
            s.body.split('\n\n').map((para, j) =>
              React.createElement('p', { key:j, style:{ marginBottom: j < s.body.split('\n\n').length-1 ? 14 : 0 } }, para)
            )
          )
        )
      )
    )
  );
}

function ChecklistSection() {
  const groups = [
    { t:'Brand',    items:['Clear customer segment defined','Clear price tier confirmed','Clear destination story','Custom print identity decided'] },
    { t:'Product',  items:['3 to 5 hero styles selected','One cohesive print story','Sample approved','Fit notes documented','Fabric selected for use case'] },
    { t:'Production', items:['Tech pack complete','Label and packaging confirmed','MOQ and size split confirmed','Lead time confirmed','QC checklist approved'] },
    { t:'Sales',    items:['Product pages built from samples','Wholesale line sheet ready','Photography complete','Social content prepared','Retailer pitch written'] },
    { t:'Metrics',  items:['Sell-through rate tracked','Inventory turnover tracked','Gross margin documented','Return reasons logged','Best-selling print identified'] },
    { t:'Launch',   items:['4–6 wks: mood & print reveal','3–4 wks: sample proof content','2 wks: styling & use cases','Launch week: conversion assets','Post-launch: UGC capture plan'] },
  ];
  const [checked, setChecked] = React.useState({});
  const toggle = k => setChecked(p => ({ ...p, [k]:!p[k] }));
  return React.createElement('div', { className:'checklist-grid' },
    groups.map((g, gi) =>
      React.createElement('div', { key:gi },
        React.createElement('div', { className:'cl-group-title' }, g.t),
        g.items.map((item, ii) => {
          const k = `${gi}-${ii}`;
          return React.createElement('div', { key:ii, className:`cl-item${checked[k]?' checked':''}`, onClick:()=>toggle(k) },
            React.createElement('div', { className:'cl-box' }),
            React.createElement('span', null, item)
          );
        })
      )
    )
  );
}

Object.assign(window, {
  ProgressBar, Sidebar, Counter, BarChart, SectionHeader, PullQuote, RTable,
  LifecycleSection, CustomerSection, ThemesSection, ArchetypesSection,
  ChannelsSection, RiskSection, ScenarioSection, MetricsSection,
  AgendaSection, PlaybookSection, ChecklistSection
});

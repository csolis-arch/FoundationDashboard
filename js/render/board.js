// Board-facing additions to the Overview tab:
//   1) a "Board Summary" hero (the 30-second headline + target-framed stats)
// Plus printBoardPacket(): a one-click, board-ready print/PDF of the summary.

function renderBoard(year) {
  const d = DATA[year] || {};
  const grants = d.grants || [];
  const sum = document.getElementById('board-summary');
  if (!grants.length) {
    if (sum) sum.innerHTML = '';
    return;
  }

  const committed = grants.reduce((s, g) => s + g.amt, 0);
  const orgs = new Set(grants.map(g => g.org)).size;
  const n = grants.length;
  const meta = d.meta || {};
  const target = meta.target || 0;
  const pct = target ? Math.round(committed / target * 100) : 0;
  const remaining = target ? Math.max(0, target - committed) : 0;
  const cycle = (meta.config && meta.config.cycleLabel) ? meta.config.cycleLabel + ' Cycle' : 'Year-to-Date';
  const comp = meta.compliance;

  // ── Hero: eyebrow + plain-English headline + compliance pill + stat tiles ──
  if (sum) {
    const pill = comp
      ? `<span class="bh-pill ${comp.status === 'ontrack' ? 'ok' : 'warn'}" title="${(comp.detail || '').replace(/"/g, '&quot;')}"><span class="bh-dot"></span>5% Distribution · ${comp.label}</span>`
      : '';

    const headline = target
      ? `<strong>${fmt(committed)}</strong> committed across <strong>${n}</strong> grants to <strong>${orgs}</strong> organizations &mdash; <strong>${pct}%</strong> of the ${fmt(target)} ${year} distribution target.`
      : `<strong>${fmt(committed)}</strong> committed across <strong>${n}</strong> grants to <strong>${orgs}</strong> organizations.`;

    const tiles = [
      { v: fmt(committed), l: 'Committed · ' + cycle, c: 'var(--gold-light)' },
      target ? { v: pct + '%', l: 'Of $' + (target / 1e6) + 'M Target', c: 'var(--green)' } : null,
      { v: String(orgs), l: 'Organizations Funded', c: 'var(--text)' },
      target ? { v: fmt(remaining), l: 'Remaining to Target', c: 'var(--orange)' } : { v: String(n), l: 'Grants Made', c: 'var(--text)' },
    ].filter(Boolean);

    sum.innerHTML = `
      <div class="board-hero fade-in visible">
        <div class="bh-head">
          <div class="bh-eyebrow">Board Summary · ${year} ${cycle.replace(' Cycle', ' cycle')}</div>
          ${pill}
        </div>
        <div class="bh-headline">${headline}</div>
        <div class="bh-stats">
          ${tiles.map(t => `<div class="bh-stat"><div class="bh-stat-v" style="color:${t.c}">${t.v}</div><div class="bh-stat-l">${t.l}</div></div>`).join('')}
        </div>
      </div>`;
  }
}

// ── One-click board packet: switch to the Overview (the curated landing),
//    then open the browser print dialog. The print stylesheet re-themes the
//    page to a clean, light, ink-friendly layout. Users can "Save as PDF".
function printBoardPacket() {
  if (typeof switchTabById === 'function') switchTabById('overview');
  // Reveal any not-yet-faded sections so nothing prints blank.
  document.querySelectorAll('#section-overview .fade-in').forEach(el => el.classList.add('visible'));
  document.body.classList.add('printing-packet');
  const cleanup = () => {
    document.body.classList.remove('printing-packet');
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  // Give the layout a tick to settle before invoking print.
  setTimeout(() => window.print(), 150);
}

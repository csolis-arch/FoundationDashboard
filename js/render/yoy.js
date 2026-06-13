// Year-over-Year tab. Compares the two most recent years that have grant data
// (e.g. 2025 vs 2026): headline KPI deltas, giving by focus area, new vs lapsed
// grantees, and movement among the top recipients.
//
// Caveat baked into the UI: the later year may be a partial year (a single
// grant cycle), so declines are expected. The disclaimer callout explains this.

// Normalize an org name so the same charity matches across years despite
// punctuation / casing differences ("Haven For Hope" vs "Haven for Hope").
function _yoyKey(org) {
  return String(org || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Roll a grant list up into totals and per-org / per-category aggregates.
function _yoyAgg(grants) {
  const a = { total: 0, count: grants.length, orgs: {}, cats: {} };
  grants.forEach(g => {
    a.total += g.amt;
    a.cats[g.cat] = (a.cats[g.cat] || 0) + g.amt;
    const k = _yoyKey(g.org);
    if (!a.orgs[k]) a.orgs[k] = { name: g.org, amt: 0, count: 0 };
    a.orgs[k].amt += g.amt;
    a.orgs[k].count += 1;
  });
  a.uniqueOrgs = Object.keys(a.orgs).length;
  a.avg = a.count ? a.total / a.count : 0;
  return a;
}

// Pick the two most recent years that actually carry a grants array.
function _yoyYears() {
  return Object.keys(DATA)
    .map(Number)
    .filter(y => DATA[y] && (DATA[y].grants || []).length)
    .sort((x, y) => x - y)
    .slice(-2);
}

// Render a "▲ 12% vs 2025" style delta chip. Neutral 'new' state when there is
// no prior-year value to compare against.
function _yoyDeltaChip(cur, prev, prevYear, opts) {
  opts = opts || {};
  if (!prev) return `<span class="yoy-delta new">new</span>`;
  const pct = (cur - prev) / prev * 100;
  if (Math.abs(pct) < 0.5) return `<span class="yoy-delta flat">≈ flat vs ${prevYear}</span>`;
  const up = pct > 0;
  const cls = up ? 'up' : 'down';
  const arrow = up ? '▲' : '▼';
  return `<span class="yoy-delta ${cls}">${arrow} ${Math.abs(pct).toFixed(0)}% vs ${prevYear}</span>`;
}

function _yoyKpi(label, cur, prev, prevYear, formatter) {
  const f = formatter || (v => v.toLocaleString());
  return `<div class="kpi-box">
    <div class="kpi-val2">${f(cur)}</div>
    <div class="kpi-label2">${label}</div>
    <div class="yoy-kpi-sub">${f(prev)} in ${prevYear} &nbsp;${_yoyDeltaChip(cur, prev, prevYear)}</div>
  </div>`;
}

function renderYoY() {
  const years = _yoyYears();
  const hasData = setTabData('yoy', years.length >= 2,
    'Year-over-year analysis needs at least two years of imported grant data. Once a second year is loaded, the comparison will appear here.');
  if (!hasData) return;

  const [yEarly, yLate] = years;
  const aEarly = _yoyAgg(DATA[yEarly].grants || []);
  const aLate = _yoyAgg(DATA[yLate].grants || []);

  // Sync year labels scattered through the markup.
  const catYears = document.getElementById('yoy-cat-years');
  if (catYears) catYears.textContent = yEarly + ' vs ' + yLate;
  document.querySelectorAll('.yoy-yr-early').forEach(el => { el.textContent = yEarly; });
  document.querySelectorAll('.yoy-yr-late').forEach(el => { el.textContent = yLate; });

  // ── Headline KPIs (later year is the focus; earlier year is the baseline) ──
  const kpiRow = document.getElementById('yoy-kpi-row');
  if (kpiRow) {
    kpiRow.innerHTML =
      _yoyKpi('Total Committed', aLate.total, aEarly.total, yEarly, fmt) +
      _yoyKpi('Grants Made', aLate.count, aEarly.count, yEarly, v => v.toLocaleString()) +
      _yoyKpi('Organizations', aLate.uniqueOrgs, aEarly.uniqueOrgs, yEarly, v => v.toLocaleString()) +
      _yoyKpi('Average Grant', aLate.avg, aEarly.avg, yEarly, fmt);
  }

  // ── Giving by focus area ──────────────────────────────────────────────────
  const catEl = document.getElementById('yoy-category');
  if (catEl) {
    const allCats = (typeof CATS !== 'undefined' && CATS.length)
      ? CATS.slice()
      : [...new Set([...Object.keys(aEarly.cats), ...Object.keys(aLate.cats)])];
    // Order by combined size, largest first.
    allCats.sort((a, b) =>
      ((aLate.cats[b] || 0) + (aEarly.cats[b] || 0)) - ((aLate.cats[a] || 0) + (aEarly.cats[a] || 0)));
    const maxCat = Math.max(1, ...allCats.map(c => Math.max(aEarly.cats[c] || 0, aLate.cats[c] || 0)));
    const color = (typeof CAT_COLORS !== 'undefined') ? CAT_COLORS : {};

    catEl.innerHTML = `<div class="yoy-cat-legend">
        <span><span class="yoy-swatch" style="background:var(--text-dim)"></span>${yEarly}</span>
        <span><span class="yoy-swatch" style="background:var(--gold)"></span>${yLate}</span>
      </div>` +
      allCats.map(c => {
        const e = aEarly.cats[c] || 0, l = aLate.cats[c] || 0;
        const col = color[c] || 'var(--gold)';
        return `<div class="yoy-cat-row">
          <div class="yoy-cat-label">${c}</div>
          <div class="yoy-cat-bars">
            <div class="yoy-cat-bar"><div class="yoy-cat-track"><div class="yoy-cat-fill early" style="width:${(e / maxCat * 100).toFixed(1)}%"></div></div><span class="yoy-cat-amt">${e ? fmt(e) : '—'}</span></div>
            <div class="yoy-cat-bar"><div class="yoy-cat-track"><div class="yoy-cat-fill late" style="width:${(l / maxCat * 100).toFixed(1)}%;background:${col}"></div></div><span class="yoy-cat-amt">${l ? fmt(l) : '—'}</span></div>
          </div>
          <div class="yoy-cat-delta">${_yoyDeltaChip(l, e, yEarly)}</div>
        </div>`;
      }).join('');
  }

  // ── New vs lapsed grantees ────────────────────────────────────────────────
  const newOrgs = Object.keys(aLate.orgs)
    .filter(k => !aEarly.orgs[k])
    .map(k => aLate.orgs[k])
    .sort((a, b) => b.amt - a.amt);
  const lapsedOrgs = Object.keys(aEarly.orgs)
    .filter(k => !aLate.orgs[k])
    .map(k => aEarly.orgs[k])
    .sort((a, b) => b.amt - a.amt);

  const orgListHTML = (list, emptyMsg) => {
    if (!list.length) return `<div class="yoy-empty">${emptyMsg}</div>`;
    return list.map(o =>
      `<div class="yoy-org-row">
        <div class="yoy-org-name">${o.name}</div>
        <div class="yoy-org-amt">${fmt(o.amt)}${o.count > 1 ? `<span class="yoy-org-ct">${o.count}×</span>` : ''}</div>
      </div>`).join('');
  };

  const newEl = document.getElementById('yoy-new');
  if (newEl) newEl.innerHTML =
    `<div class="yoy-list-head">${newOrgs.length} organizations · ${fmt(newOrgs.reduce((s, o) => s + o.amt, 0))}</div>` +
    orgListHTML(newOrgs, 'No new grantees this period.');

  const lapsedEl = document.getElementById('yoy-lapsed');
  if (lapsedEl) lapsedEl.innerHTML =
    `<div class="yoy-list-head">${lapsedOrgs.length} organizations · ${fmt(lapsedOrgs.reduce((s, o) => s + o.amt, 0))} in ${yEarly}</div>` +
    orgListHTML(lapsedOrgs, 'Every prior grantee has been funded again.');

  // ── Top recipient movement ────────────────────────────────────────────────
  const toEl = document.getElementById('yoy-toporgs');
  if (toEl) {
    const keys = new Set([...Object.keys(aEarly.orgs), ...Object.keys(aLate.orgs)]);
    const rows = [...keys].map(k => {
      const e = aEarly.orgs[k], l = aLate.orgs[k];
      return {
        name: (l && l.name) || (e && e.name),
        early: e ? e.amt : 0,
        late: l ? l.amt : 0,
      };
    });
    // Rank by the larger of the two years so big movers in either direction surface.
    rows.sort((a, b) => Math.max(b.early, b.late) - Math.max(a.early, a.late));
    const top = rows.slice(0, 12);
    toEl.innerHTML =
      `<thead><tr><th>Organization</th><th style="text-align:right">${yEarly}</th><th style="text-align:right">${yLate}</th><th style="text-align:right">Change</th></tr></thead><tbody>` +
      top.map(r => `<tr>
        <td data-label="Organization" style="color:var(--text)">${r.name}</td>
        <td data-label="${yEarly}" class="mono" style="text-align:right;color:var(--text-dim)">${r.early ? fmt(r.early) : '—'}</td>
        <td data-label="${yLate}" class="mono gold-text" style="text-align:right">${r.late ? fmt(r.late) : '—'}</td>
        <td data-label="Change" style="text-align:right">${_yoyDeltaChip(r.late, r.early, yEarly)}</td>
      </tr>`).join('') +
      '</tbody>';
  }
}

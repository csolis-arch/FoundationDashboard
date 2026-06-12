// All Grants registry tab. A searchable / sortable / filterable table of every
// grant line item for the selected year, with a live count + running total and
// CSV export of the current (filtered) view. Reads from DATA[year].grants.

let _regGrants = [];
let _regYear = null;
let _regSearch = '';
let _regCat = null;            // active focus-area filter, or null for all
let _regSortKey = 'amt';       // 'org' | 'memo' | 'cat' | 'amt'
let _regSortDir = -1;          // 1 asc, -1 desc

function renderRegistry(year) {
  const d = DATA[year] || {};
  const grants = d.grants || [];
  const hasData = setTabData('registry', grants.length > 0,
    'The grant list for this year has not been imported yet. Once it is loaded, every grant line item will be searchable here.');
  if (!hasData) return;

  // Reset view state whenever the year changes (keep state within a year).
  if (year !== _regYear) {
    _regYear = year;
    _regSearch = '';
    _regCat = null;
    _regSortKey = 'amt';
    _regSortDir = -1;
    const box = document.getElementById('reg-search');
    if (box) box.value = '';
  }
  _regGrants = grants;

  // Build focus-area chips (categories present this year, by total descending).
  const catTotals = {};
  grants.forEach(g => { catTotals[g.cat] = (catTotals[g.cat] || 0) + g.amt; });
  const cats = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a]);
  const chips = document.getElementById('reg-chips');
  if (chips) {
    chips.innerHTML =
      `<button class="reg-chip${_regCat === null ? ' active' : ''}" onclick="regSetCat(null)">All areas</button>` +
      cats.map(c => {
        const color = CAT_COLORS[c] || '#888';
        return `<button class="reg-chip${_regCat === c ? ' active' : ''}" data-cat="${c}" onclick="regSetCat('${c.replace(/'/g, "\\'")}')" style="--chip:${color}"><span class="reg-chip-dot" style="background:${color}"></span>${c}</button>`;
      }).join('');
  }

  regApply();
}

function _regFiltered() {
  const q = _regSearch.trim().toLowerCase();
  let rows = _regGrants.filter(g => {
    if (_regCat && g.cat !== _regCat) return false;
    if (!q) return true;
    return (g.org && g.org.toLowerCase().includes(q)) ||
           (g.memo && g.memo.toLowerCase().includes(q)) ||
           (g.cat && g.cat.toLowerCase().includes(q));
  });
  const key = _regSortKey, dir = _regSortDir;
  rows = rows.slice().sort((a, b) => {
    let av, bv;
    if (key === 'amt') { av = a.amt; bv = b.amt; }
    else { av = (a[key] || '').toLowerCase(); bv = (b[key] || '').toLowerCase(); }
    if (av < bv) return -1 * dir;
    if (av > bv) return 1 * dir;
    return 0;
  });
  return rows;
}

function regApply() {
  const rows = _regFiltered();
  const tbody = document.getElementById('reg-tbody');
  const empty = document.getElementById('reg-empty');
  const table = document.getElementById('reg-table');
  if (!tbody) return;

  tbody.innerHTML = rows.map((g, i) => {
    const color = CAT_COLORS[g.cat] || '#888';
    return `<tr>
      <td style="color:var(--text-dim);font-family:'DM Mono',monospace;font-size:12px">${i + 1}</td>
      <td>${_regEsc(g.org)}</td>
      <td style="color:var(--text-muted);font-size:12px">${g.memo ? _regEsc(g.memo) : '<span style="color:var(--text-dim)">—</span>'}</td>
      <td><span class="cat-pill" style="background:${color}22;color:${color}">${_regEsc(g.cat)}</span></td>
      <td class="amt-cell">${fmtFull(g.amt)}</td>
    </tr>`;
  }).join('');

  if (empty) empty.style.display = rows.length ? 'none' : '';
  if (table) table.style.display = rows.length ? '' : 'none';

  // Summary line: count + running total of the current view.
  const total = rows.reduce((s, g) => s + g.amt, 0);
  const all = _regGrants.length;
  const summary = document.getElementById('reg-summary');
  if (summary) {
    const filtered = rows.length !== all || _regCat || _regSearch.trim();
    summary.innerHTML = `<strong>${rows.length}</strong> of ${all} grant${all === 1 ? '' : 's'}` +
      (filtered ? ' (filtered)' : '') +
      ` · <strong>${fmtFull(total)}</strong> total` +
      (rows.length ? ` · avg ${fmtFull(Math.round(total / rows.length))}` : '');
  }

  // Sort arrows
  ['org', 'memo', 'cat', 'amt'].forEach(k => {
    const el = document.getElementById('reg-arr-' + k);
    if (el) el.textContent = (k === _regSortKey) ? (_regSortDir === 1 ? '▲' : '▼') : '';
  });
}

function regSearch(v) { _regSearch = v; regApply(); }

function regSetCat(c) { _regCat = c; regApply(); _regSyncChips(); }

function _regSyncChips() {
  document.querySelectorAll('#reg-chips .reg-chip').forEach(b => {
    const c = b.dataset.cat || null;
    b.classList.toggle('active', c === _regCat);
  });
}

function regSort(key) {
  if (_regSortKey === key) {
    _regSortDir *= -1;
  } else {
    _regSortKey = key;
    _regSortDir = (key === 'amt') ? -1 : 1; // amounts default high→low; text A→Z
  }
  regApply();
}

function _regEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function regExportCsv() {
  const rows = _regFiltered();
  const head = ['Date', 'Organization', 'Purpose/Memo', 'Focus Area', 'Amount'];
  const esc = v => {
    const s = String(v == null ? '' : v);
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const lines = [head.join(',')];
  rows.forEach(g => lines.push([g.d, g.org, g.memo, g.cat, g.amt].map(esc).join(',')));
  const csv = lines.join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `GFF_grants_${_regYear || ''}${_regCat ? '_' + _regCat.replace(/[^a-z0-9]+/gi, '-') : ''}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

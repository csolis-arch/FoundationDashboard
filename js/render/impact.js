// Estimated Impact tab. Renders hero metric cards and per-category
// expandable tables of every grantee with a reach estimate.

function renderImpact(year) {
  const d = DATA[year] || {};
  const impact = d.impact || [];
  const hasData = setTabData('impact', impact.length > 0,
    'Impact estimates for 2026 will be generated once the grant cycle is imported and reach figures are compiled.');
  if (!hasData) return;

  const impactYear = document.getElementById('impact-year');
  if (impactYear) impactYear.textContent = year;
  const footnote = document.getElementById('impact-footnote');
  if (footnote) footnote.innerHTML = d.impactFootnote || '';

  renderHeroes(d.heroes1 || [], 'impact-heroes');
  renderHeroes(d.heroes2 || [], 'impact-heroes-2');

  const container = document.getElementById('impact-tables');
  container.innerHTML = '';

  CATS.forEach(cat => {
    const orgs = impact.filter(r => r.cat === cat);
    if (!orgs.length) return;
    const totalAmt = orgs.reduce((s,r) => s + r.amt, 0);
    const totalReach = orgs.filter(r => r.unit !== 'research' && r.unit !== 'policy' && r.unit !== 'membership' && r.unit !== 'in memoriam').reduce((s,r) => s + r.reach, 0);
    const color = IMPACT_COLORS[cat];

    const tableId = 'tbl-' + cat.replace(/[^a-z]/gi,'');
    const div = document.createElement('div');
    div.style.cssText = 'margin-bottom:20px';
    div.innerHTML = `
      <div onclick="toggleTable('${tableId}')" style="background:var(--surface);border:1px solid var(--border);border-radius:8px 8px 0 0;border-left:4px solid ${color};padding:14px 20px;cursor:pointer;display:flex;justify-content:space-between;align-items:center">
        <div>
          <span style="font-weight:600;color:${color};font-size:13px">${cat}</span>
          <span style="margin-left:12px;font-size:11px;color:var(--text-dim)">${orgs.length} grants · $${(totalAmt/1e6).toFixed(2)}M · ${totalReach.toLocaleString()} people/units reached per year</span>
        </div>
        <span id="arr-${tableId}" style="color:var(--text-dim);font-size:14px">▼</span>
      </div>
      <div id="${tableId}" style="display:none;border:1px solid var(--border);border-top:none;border-radius:0 0 8px 8px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead>
            <tr style="background:var(--surface2)">
              <th style="padding:9px 14px;text-align:left;font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:500;border-bottom:1px solid var(--border)">Organization</th>
              <th style="padding:9px 14px;text-align:right;font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:500;border-bottom:1px solid var(--border);white-space:nowrap">${year} Grant</th>
              <th style="padding:9px 14px;text-align:right;font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:500;border-bottom:1px solid var(--border);white-space:nowrap">Reach</th>
              <th style="padding:9px 14px;text-align:left;font-size:9.5px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);font-weight:500;border-bottom:1px solid var(--border)">Impact Detail</th>
            </tr>
          </thead>
          <tbody>
            ${orgs.sort((a,b) => b.amt - a.amt).map((r,i) => `
              <tr style="border-bottom:1px solid rgba(42,48,80,0.3);${i%2===0?'':'background:rgba(31,36,54,0.3)'}">
                <td style="padding:9px 14px;font-weight:500;color:var(--text)">${r.org}</td>
                <td style="padding:9px 14px;text-align:right;font-family:'DM Mono',monospace;color:var(--gold-light)">$${r.amt.toLocaleString()}</td>
                <td style="padding:9px 14px;text-align:right;font-family:'DM Mono',monospace;color:${color};white-space:nowrap">${r.reach > 0 ? r.reach.toLocaleString() + ' ' + r.unit : '—'}</td>
                <td style="padding:9px 14px;color:var(--text-muted);font-size:11px;line-height:1.5">${r.detail}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    container.appendChild(div);
  });

  // Auto-open homelessness table
  toggleTable('tbl-HomelessnessBasicNeeds');
}

function renderHeroes(rows, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = rows.map(h => `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:20px 22px;border-top:3px solid ${h.color}">
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-bottom:8px">${h.label}</div>
      <div style="font-family:'Playfair Display',serif;font-size:${h.value.length > 8 ? '1.5rem' : '2.1rem'};font-weight:700;color:${h.color};line-height:1.1;margin-bottom:8px">${h.value}</div>
      <div style="font-size:11px;color:var(--text-muted);line-height:1.6">${h.note}</div>
    </div>
  `).join('');
}

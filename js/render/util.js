// Shared render helpers used across all tabs.

function fmt(n) {
  if (n >= 1000000) return '$' + (n/1000000).toFixed(2) + 'M';
  if (n >= 1000) return '$' + (n/1000).toFixed(n>=100000?0:1) + 'K';
  return '$' + n.toLocaleString();
}
function fmtFull(n) { return '$' + n.toLocaleString(); }

function classifyType(org, memo) {
  const m = (memo || '').toLowerCase().trim();
  const o = (org || '').toLowerCase().trim();

  // In Memoriam (Mr. Greehey is the living founder — naming gifts are not memorial)
  if ((m.includes('in honor') || m.includes('legacy of light')) && !m.includes('greehey'))
    return 'In Memoriam';

  // Admin & Fees
  if (m.includes('membership') || m.includes('dues'))
    return 'Admin & Fees';

  // Events & Sponsorships
  if (m.includes('golf') || m.includes('luncheon') ||
      m.includes('walk for') || m.includes('balloonfest') ||
      m.includes('power of the purse') || m.includes('good scout') ||
      m.includes('tribute to') || m.includes('heights night') ||
      m.includes('outside the box') ||
      o.includes('livestock exposition') ||
      o.includes('texas business hall'))
    return 'Events & Sponsorships';

  // Capital — buildings, equipment, endowments, scholarship pledges
  if (m.includes('capital campaign') || m.includes('capital ') ||
      m.includes('campus expansion') || m.includes('campus improvements') ||
      m.includes('new donor center') || m.includes('trima') ||
      m.includes('phase ii') || m.includes('be bold scholarship') ||
      m.includes('student pledge') || m.includes('scoreboard') ||
      m.includes('arena') || m.includes('scholarship fund') ||
      m.includes('endowment') ||
      (o.includes('house of neighborly') && m.includes('capital')))
    return 'Capital';

  // Unrestricted — no specific restriction, per application, blank
  if (m === '' || m.includes('per application') ||
      (o.includes('united way') && (m.includes('pledge payment') || m.includes('emergency assistance'))))
    return 'Unrestricted';

  // Operational — explicitly for general operations
  if (m.includes('general operations') ||
      m === 'operations' ||
      (m.startsWith('operations') && m.length < 15))
    return 'Operational';

  // Everything else = Program
  return 'Program';
}

function toggleTable(id) {
  const el = document.getElementById(id);
  const arr = document.getElementById('arr-' + id);
  if (!el) return;
  const open = el.style.display === 'none';
  el.style.display = open ? 'block' : 'none';
  if (arr) arr.textContent = open ? '▲' : '▼';
}

// Toggle a tab between its real content and a "data not loaded" placeholder.
// Returns true when data is present (caller should proceed to render).
function setTabData(tab, hasData, message) {
  const content = document.getElementById(tab + '-content');
  const ph = document.getElementById(tab + '-placeholder');
  if (content) content.style.display = hasData ? '' : 'none';
  if (ph) {
    ph.style.display = hasData ? 'none' : '';
    if (!hasData && message) ph.innerHTML = placeholderHTML(message);
  }
  return hasData;
}

function placeholderHTML(message) {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 24px;color:var(--text-dim)">
    <div style="font-size:34px;margin-bottom:14px;opacity:0.6">📥</div>
    <div style="font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--text-muted);margin-bottom:8px">Data not yet loaded</div>
    <div style="font-size:12.5px;max-width:420px;line-height:1.7">${message}</div>
  </div>`;
}

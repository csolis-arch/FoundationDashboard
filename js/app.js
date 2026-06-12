// Application orchestration: year switching, page metadata, tab switching, boot.

let currentYear = 2026;

// ─────────────────────────────────────────────────────────────
// PAGE METADATA (title, badge, footer, RMD outlook / target bar)
// ─────────────────────────────────────────────────────────────
function renderMeta(year) {
  const meta = (DATA[year] && DATA[year].meta) || {};
  const titleEl = document.getElementById('dash-title');
  if (titleEl && meta.title) titleEl.innerHTML = meta.title;
  const badgeEl = document.getElementById('year-badge');
  if (badgeEl && meta.badge) badgeEl.textContent = meta.badge;
  const footerLabel = document.getElementById('footer-label');
  if (footerLabel && meta.footerLabel) footerLabel.textContent = meta.footerLabel;

  // RMD bar (static 2025 outlook) is tied to financial (990) data.
  const hasFin = !!(DATA[year] && DATA[year].portfolio && DATA[year].portfolio.length);
  const rmdBar = document.getElementById('rmd-bar');
  if (rmdBar) rmdBar.style.display = hasFin ? '' : 'none';

  // Target progress bar — shown for years with a distribution target (2026+).
  const targetBar = document.getElementById('target-bar');
  if (targetBar) {
    if (meta.target) {
      const grants = (DATA[year] && DATA[year].grants) || [];
      const committed = grants.reduce((s, g) => s + g.amt, 0);
      const target = meta.target;
      const pct = Math.round(committed / target * 100);
      const remaining = Math.max(0, target - committed);
      // Split committed dollars by grant cycle (months 1–6 = June cycle, 7–12 = November cycle).
      const juneAmt = grants.filter(g => parseInt(g.d.split('/')[0], 10) <= 6).reduce((s, g) => s + g.amt, 0);
      const novAmt = committed - juneAmt;
      const junePct = juneAmt / target * 100;
      const novPct = novAmt / target * 100;
      document.getElementById('target-bar-inner').innerHTML = `
        <div style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--text-dim);white-space:nowrap;flex-shrink:0">${year} Distribution<br>Target</div>
        <div style="flex:1;min-width:0">
          <div style="position:relative;height:48px;border-radius:8px;overflow:hidden;background:var(--surface2)">
            <div style="position:absolute;top:0;left:0;height:100%;width:${junePct}%;background:linear-gradient(90deg,#c9a84c,#e2c67a)"></div>
            <div style="position:absolute;top:0;left:${junePct}%;height:100%;width:${novPct}%;background:linear-gradient(90deg,#4ec9a4,#5b8dee)"></div>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:0 12px">
              <span style="font-size:12px;color:#fff;font-weight:600;white-space:nowrap;text-shadow:0 1px 2px rgba(0,0,0,0.5)">${fmt(committed)} committed · ${pct}% of ${fmt(target)} target</span>
            </div>
          </div>
          <div style="display:flex;gap:16px;margin-top:7px;flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:var(--text-dim)"><span style="width:9px;height:9px;border-radius:2px;background:#c9a84c;flex-shrink:0"></span>June cycle ${fmt(juneAmt)}</div>
            <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:var(--text-dim)"><span style="width:9px;height:9px;border-radius:2px;background:#4ec9a4;flex-shrink:0"></span>November cycle ${novAmt > 0 ? fmt(novAmt) : '— upcoming'}</div>
          </div>
        </div>
        <div class="rmd-divider"></div>
        <div style="display:flex;gap:20px;flex-shrink:0">
          <div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--gold-light);line-height:1">${fmt(committed)}</div><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-top:3px">Committed</div></div>
          <div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--blue);line-height:1">${fmt(target)}</div><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-top:3px">${year} Target</div></div>
          <div style="text-align:center"><div style="font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:var(--orange);line-height:1">${fmt(remaining)}</div><div style="font-size:9px;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-dim);margin-top:3px">Remaining</div></div>
        </div>`;
      targetBar.style.display = '';
    } else {
      targetBar.style.display = 'none';
    }
  }

  // Footer financial stats are fully data-driven per year.
  const footerStats = document.getElementById('footer-stats');
  if (footerStats) {
    if (meta.footerStats && meta.footerStats.length) {
      footerStats.innerHTML = meta.footerStats.map((s, i) =>
        (i ? '<div class="footer-divider"></div>' : '') +
        `<div class="footer-item"><div class="footer-val"${s.color ? ` style="color:${s.color}"` : ''}>${s.val}</div><div class="footer-lbl">${s.lbl}</div></div>`
      ).join('');
      footerStats.style.display = '';
    } else {
      footerStats.style.display = 'none';
    }
  }
}

// ─────────────────────────────────────────────────────────────
// YEAR SWITCHING
// ─────────────────────────────────────────────────────────────
function setYear(year) {
  year = +year;
  currentYear = year;
  document.querySelectorAll('.year-toggle-btn').forEach(b =>
    b.classList.toggle('active', +b.dataset.year === year));

  renderMeta(year);
  renderOverview(year);
  renderRegistry(year);
  renderImpact(year);
  renderFunding(year);
  renderWaterfall(year);
  renderDependency(year);
  renderFinancial(year);
}

// ─────────────────────────────────────────────────────────────
// TAB SWITCHING
// ─────────────────────────────────────────────────────────────
function switchTab(id, el) {
  document.querySelectorAll('.tab, .menu-item, .tab-menu-btn').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  // Activate the matching nav element(s) — primary tab or dropdown item.
  document.querySelectorAll('[data-tab="' + id + '"]').forEach(t => t.classList.add('active'));
  // If the tab lives inside a dropdown, light up that menu's button too.
  const item = document.querySelector('.menu-item[data-tab="' + id + '"]');
  if (item) {
    const menu = item.closest('.tab-menu');
    const btn = menu && menu.querySelector('.tab-menu-btn');
    if (btn) btn.classList.add('active');
  }
  const section = document.getElementById('section-' + id);
  if (section) section.classList.add('active');
  // Keep the mobile dropdown in sync with whichever tab is active.
  const sel = document.getElementById('mobile-nav');
  if (sel && sel.value !== id) sel.value = id;
  closeMenus();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Lazy-load iframes on first click
  if (id === 'heatmap') {
    const fr = document.getElementById('heatmap-frame');
    if (!fr.src) fr.src = 'tools/grant-map.html';
  }
  if (id === 'rmd') {
    const fr = document.getElementById('rmd-frame');
    if (!fr.src) fr.src = 'tools/rmd-projection.html';
  }
  if (id === 'allocator') {
    const fr = document.getElementById('allocator-frame');
    if (!fr.src) fr.src = 'tools/grant-allocator.html';
  }

  // Re-trigger fade-ins on overview tab
  if (id === 'overview') {
    document.querySelectorAll('.fade-in').forEach(el => {
      if (!el.classList.contains('visible')) el.classList.add('visible');
    });
  }
}

// Switch tab by id (used by the mobile dropdown nav).
function switchTabById(id) {
  const tab = document.querySelector('[data-tab="' + id + '"]');
  switchTab(id, tab);
}

// ─────────────────────────────────────────────────────────────
// DESKTOP DROPDOWN MENUS (Analysis ▾ / Tools ▾)
// ─────────────────────────────────────────────────────────────
function toggleMenu(name, ev) {
  if (ev) ev.stopPropagation();
  const m = document.getElementById('menu-' + name);
  if (!m) return;
  const wasOpen = m.classList.contains('open');
  closeMenus();
  if (!wasOpen) m.classList.add('open');
}
function closeMenus() {
  document.querySelectorAll('.tab-menu.open').forEach(m => m.classList.remove('open'));
}
document.addEventListener('click', function (e) {
  if (!e.target.closest('.tab-menu')) closeMenus();
});

// ─────────────────────────────────────────────────────────────
// NEWSLETTERS (opened from the header button, not the tab row)
// ─────────────────────────────────────────────────────────────
function openNewsletters() {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-newsletters').classList.add('active');
  const fr = document.getElementById('newsletters-frame');
  if (!fr.src) fr.src = 'newsletters/index.html';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────
setYear(currentYear);

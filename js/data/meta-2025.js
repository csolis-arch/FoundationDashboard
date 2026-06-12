// Data: meta-2025.js
// Year-level metadata (title, badge, footer, RMD outlook) for 2025.

DATA[2025] = DATA[2025] || {};

DATA[2025].meta = {
  title: '2025 Grant Portfolio<br>Analysis',
  badge: 'Year-to-Date · San Antonio, TX',
  footerLabel: 'Greehey Family Foundation · 2025 Analysis',
  config: { showMonthly: true },
  footerStats: [
    { val: '~$265M',  lbl: 'Est. Current FMV' },
    { val: '~$984K',  lbl: 'Est. 2025 Gap',        color: 'var(--red)' },
    { val: '~$12.6M', lbl: '2026 Min. Required',    color: 'var(--blue)' },
    { val: '$1.96M',  lbl: '2026 Pledges Locked',   color: 'var(--orange)' },
  ],
};

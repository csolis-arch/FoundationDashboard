// Data: meta-2025.js
// Year-level metadata (title, badge, footer, RMD outlook) for 2025.

DATA[2025] = DATA[2025] || {};

DATA[2025].meta = {
  title: '2025 Grant Portfolio<br>Analysis',
  badge: 'Year-to-Date · San Antonio, TX',
  footerLabel: 'Greehey Family Foundation · 2025 Analysis',
  config: { showMonthly: true },
  // 5% minimum-distribution (RMD) compliance summary for the family-facing Overview.
  compliance: {
    status: 'watch',
    label: 'Watch',
    headline: '~$984K below the 2025 minimum distribution',
    detail: 'The 2025 grant surge (~$13.5M) cured the 2024 carryforward, but an estimated ~$984K gap to the combined 2025 requirement (~$14.48M) remains. The cure window stays open through Dec 31, 2026.',
    linkTab: 'financial',
  },
  footerStats: [
    { val: '~$265M',  lbl: 'Est. Current FMV' },
    { val: '~$984K',  lbl: 'Est. 2025 Gap',        color: 'var(--red)' },
    { val: '~$12.6M', lbl: '2026 Min. Required',    color: 'var(--blue)' },
    { val: '$1.96M',  lbl: '2026 Pledges Locked',   color: 'var(--orange)' },
  ],
};

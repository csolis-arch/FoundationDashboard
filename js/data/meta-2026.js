// Data: meta-2026.js
// Year-level metadata for 2026. The June 2026 cycle is the first of the year;
// the Foundation's 2026 distribution target is $15M (committed-to-date shown
// against it via the target progress bar).

DATA[2026] = DATA[2026] || {};

DATA[2026].meta = {
  title: '2026 Grant Portfolio<br>Analysis',
  badge: 'June Cycle · San Antonio, TX',
  footerLabel: 'Greehey Family Foundation · 2026 Grant Cycle',
  target: 15000000,            // 2026 distribution target
  config: {
    showMonthly: false,        // single June cycle — month view not meaningful
    showOutlook: false,        // hide the 2025-centric RMD/outlook card
    cycleMonth: 6,
    cycleLabel: 'June',
  },
  // 5% minimum-distribution (RMD) compliance summary for the family-facing Overview.
  compliance: {
    status: 'ontrack',
    label: 'On Track',
    headline: '$15M distribution target set for 2026',
    detail: 'The Foundation is planning a $15M distribution for 2026, well above its 5% minimum payout requirement. $8.55M is committed in the June cycle; the November cycle is expected to close the remainder.',
  },
  // Sticky-footer stats (committed % computed at render against target)
  footerStats: [
    { val: '$8.55M', lbl: 'Committed (June Cycle)', color: 'var(--gold-light)' },
    { val: '$15M', lbl: '2026 Distribution Target', color: 'var(--blue)' },
    { val: '57%', lbl: 'Of Target Committed', color: 'var(--green)' },
    { val: '90', lbl: 'Organizations Funded', color: 'var(--text)' },
  ],
};

// Financial (990-PF) data is not yet available for 2026 — the tab stays a
// placeholder until the form is filed (~12–18 months after year-end).
DATA[2026].portfolio = [];
DATA[2026].complianceData = [];
DATA[2026].treadmill = [];
DATA[2026].expenses = [];
DATA[2026].capacityItems = [];
DATA[2026].govRows = [];
DATA[2026].finInsights = [];

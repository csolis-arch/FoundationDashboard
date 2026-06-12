// Data: pledges-2026.js
// Active multi-year pledges as of the 2026 cycle. 2026 installments are shown
// as committed (paid this cycle); 2027–2028 amounts remain owed. Schedules are
// reconstructed from the 2026 grant memos and the prior-year pledge registry;
// amounts that read "part of $XM" use the stated total.

DATA[2026] = DATA[2026] || {};

DATA[2026].wfPledges = [
  {org:"Witte Museum",totalPledge:3000000,category:"Education",color:"#c9a84c",schedule:[
    {year:2025,amt:1500000,memo:"Year 1 of 2",paid:true},
    {year:2026,amt:1500000,memo:"Year 2 of 2 — Capital",paid:true},
  ]},
  {org:"UTSA – Be Bold Scholarships",totalPledge:1000000,category:"Education",color:"#c9a84c",schedule:[
    {year:2024,amt:333333,memo:"Year 1 of 3",paid:true},
    {year:2025,amt:333333,memo:"Year 2 of 3",paid:true},
    {year:2026,amt:333334,memo:"Year 3 of 3 — Final",paid:true},
  ]},
  {org:"UT Health SA – Dr. Usatine",totalPledge:375000,category:"Health & Human Welfare",color:"#4ec9a4",schedule:[
    {year:2025,amt:125000,memo:"Year 1 of 3",paid:true},
    {year:2026,amt:125000,memo:"Year 2 of 3 — Haven clinic",paid:true},
    {year:2027,amt:125000,memo:"Year 3 of 3",paid:false},
  ]},
  {org:"Sound Off",totalPledge:200000,category:"Community Causes",color:"#e07a3c",schedule:[
    {year:2024,amt:50000,memo:"Year 1 of 4",paid:true},
    {year:2025,amt:50000,memo:"Year 2 of 4",paid:true},
    {year:2026,amt:50000,memo:"Year 3 of 4",paid:true},
    {year:2027,amt:50000,memo:"Year 4 of 4",paid:false},
  ]},
  {org:"SA Young Women's Leadership Academy",totalPledge:125000,category:"Education",color:"#c9a84c",schedule:[
    {year:2024,amt:25000,memo:"Year 1 of 5",paid:true},
    {year:2025,amt:25000,memo:"Year 2 of 5",paid:true},
    {year:2026,amt:25000,memo:"Year 3 of 5",paid:true},
    {year:2027,amt:25000,memo:"Year 4 of 5",paid:false},
    {year:2028,amt:25000,memo:"Year 5 of 5",paid:false},
  ]},
  {org:"S.A.L.E. (Livestock Exposition)",totalPledge:54000,category:"Community Causes",color:"#e07a3c",schedule:[
    {year:2024,amt:18000,memo:"Year 1 of 3",paid:true},
    {year:2025,amt:18000,memo:"Year 2 of 3",paid:true},
    {year:2026,amt:18000,memo:"Year 3 of 3 — Final",paid:true},
  ]},
  {org:"Texas Business Hall of Fame – St. Mary's Scholarship",totalPledge:45000,category:"Education",color:"#c9a84c",schedule:[
    {year:2026,amt:15000,memo:"Year 1 of 3",paid:true},
    {year:2027,amt:15000,memo:"Year 2 of 3",paid:false},
    {year:2028,amt:15000,memo:"Year 3 of 3",paid:false},
  ]},
];

DATA[2026].wfKpis = [
  {cls:'kred',   val:'$215K', label:'2027 Locked Obligations'},
  {cls:'korange',val:'$40K',  label:'2028 Locked Obligations'},
  {cls:'kgold',  val:'$4.8M', label:'Total Pledge Commitments'},
  {cls:'kblue',  val:'$255K', label:'Remaining Unfulfilled (2027+)'},
];

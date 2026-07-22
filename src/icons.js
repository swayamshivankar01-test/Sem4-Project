// Plain-JS inline SVG icon set (replaces lucide-react).
// Each function returns an SVG markup string. Paths are drawn to match
// the Lucide icon set's look (24x24 viewBox, stroke-based).

function svg(paths, size = 16, extraAttrs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extraAttrs}>${paths}</svg>`;
}

export const Icon = {
  home: (s, a) => svg(`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>`, s, a),
  barChart: (s, a) => svg(`<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>`, s, a),
  clock: (s, a) => svg(`<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`, s, a),
  wallet: (s, a) => svg(`<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>`, s, a),
  user: (s, a) => svg(`<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`, s, a),
  plus: (s, a) => svg(`<path d="M5 12h14"/><path d="M12 5v14"/>`, s, a),
  search: (s, a) => svg(`<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`, s, a),
  settings: (s, a) => svg(`<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`, s, a),
  bell: (s, a) => svg(`<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`, s, a),
  chevronRight: (s, a) => svg(`<path d="m9 18 6-6-6-6"/>`, s, a),
  arrowLeft: (s, a) => svg(`<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>`, s, a),
  trendingUp: (s, a) => svg(`<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`, s, a),
  trendingDown: (s, a) => svg(`<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>`, s, a),
  coffee: (s, a) => svg(`<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>`, s, a),
  car: (s, a) => svg(`<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>`, s, a),
  zap: (s, a) => svg(`<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>`, s, a),
  shoppingBag: (s, a) => svg(`<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>`, s, a),
  heart: (s, a) => svg(`<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`, s, a),
  film: (s, a) => svg(`<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 7.5h4"/><path d="M17 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 16.5h4"/>`, s, a),
  package: (s, a) => svg(`<path d="M11 21.7a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7Z"/><path d="M7.5 4.27 16.5 9.5"/><path d="m3.29 7 8.71 5 8.71-5"/><path d="M12 22V12"/>`, s, a),
  moon: (s, a) => svg(`<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`, s, a),
  sun: (s, a) => svg(`<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`, s, a),
  download: (s, a) => svg(`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>`, s, a),
  fileText: (s, a) => svg(`<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>`, s, a),
  filter: (s, a) => svg(`<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`, s, a),
  edit: (s, a) => svg(`<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>`, s, a),
  trash: (s, a) => svg(`<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, s, a),
  checkCircle: (s, a) => svg(`<path d="M21.8 10A10 10 0 1 1 17 3.34"/><path d="m9 11 3 3L22 4"/>`, s, a),
  alertCircle: (s, a) => svg(`<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>`, s, a),
  logOut: (s, a) => svg(`<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>`, s, a),
  lock: (s, a) => svg(`<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`, s, a),
  globe: (s, a) => svg(`<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>`, s, a),
  database: (s, a) => svg(`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>`, s, a),
  shield: (s, a) => svg(`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`, s, a),
  eye: (s, a) => svg(`<path d="M2.06 12.94a1.99 1.99 0 0 1 0-1.89 10.07 10.07 0 0 1 19.88 0 1.99 1.99 0 0 1 0 1.89 10.07 10.07 0 0 1-19.88 0Z"/><circle cx="12" cy="12" r="3"/>`, s, a),
  eyeOff: (s, a) => svg(`<path d="M10.7 5.1A9.7 9.7 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.6 6.6A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M2 2l20 20"/><path d="M9.5 9.5a3 3 0 1 0 4.24 4.24"/>`, s, a),
  x: (s, a) => svg(`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`, s, a),
  creditCard: (s, a) => svg(`<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`, s, a),
  banknote: (s, a) => svg(`<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/>`, s, a),
  smartphone: (s, a) => svg(`<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>`, s, a),
  target: (s, a) => svg(`<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`, s, a),
  calendar: (s, a) => svg(`<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>`, s, a),
  award: (s, a) => svg(`<circle cx="12" cy="8" r="6"/><path d="M15.48 13.11 17 22l-5-3-5 3 1.52-8.89"/>`, s, a),
  check: (s, a) => svg(`<path d="M20 6 9 17l-5-5"/>`, s, a),
  mail: (s, a) => svg(`<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`, s, a),
  info: (s, a) => svg(`<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>`, s, a),
  star: (s, a) => svg(`<path d="M11.53 2.63a.5.5 0 0 1 .94 0l2.32 5.63a.5.5 0 0 0 .41.31l6.03.5a.5.5 0 0 1 .28.88l-4.6 3.95a.5.5 0 0 0-.16.5l1.4 5.88a.5.5 0 0 1-.75.55l-5.15-3.16a.5.5 0 0 0-.52 0l-5.15 3.16a.5.5 0 0 1-.75-.55l1.4-5.88a.5.5 0 0 0-.16-.5l-4.6-3.95a.5.5 0 0 1 .28-.88l6.03-.5a.5.5 0 0 0 .41-.31Z"/>`, s, a),
  minus: (s, a) => svg(`<path d="M5 12h14"/>`, s, a),
  refreshCw: (s, a) => svg(`<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>`, s, a),
};

export const CATEGORY_ICON = {
  Food: Icon.coffee,
  Transport: Icon.car,
  Bills: Icon.zap,
  Shopping: Icon.shoppingBag,
  Health: Icon.heart,
  Entertainment: Icon.film,
  Other: Icon.package,
};

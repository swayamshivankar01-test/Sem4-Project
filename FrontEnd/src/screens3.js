import { Icon, CATEGORY_ICON } from "./icons.js";
import { topBar, expenseRow, toggleSwitch } from "./components.js";
import { CATS, ALL_EXPENSES, NOTIFS, fmt, escapeHtml } from "./data.js";

// ─── Export ────────────────────────────────────────────────────────────
export function exportScreen(state) {
  const { format, done } = state.exportScreen;

  const formats = [
    { key: "PDF",   color: "#EF4444", desc: "Printable"   },
    { key: "Excel", color: "#16A34A", desc: "Spreadsheet" },
    { key: "CSV",   color: "#2563EB", desc: "Raw data"    },
  ].map(({ key, color, desc }) => {
    const active = format === key;
    return `
      <button class="format-btn" data-action="set-export-format" data-format="${key}"
        style="border-color:${active ? color : "var(--border)"}; background:${active ? color + "08" : "var(--card)"}">
        ${Icon.fileText(20, `style="color:${active ? color : "var(--muted-foreground)"}"`)}
        <div><p class="format-btn-name">${key}</p><p class="format-btn-desc">${desc}</p></div>
        ${active ? `<div class="format-check" style="background:${color}">${Icon.check(10, 'style="color:#fff"')}</div>` : ""}
      </button>`;
  }).join("");

  const summary = [
    ["Period", "1 – 21 Jul 2026"],
    ["Transactions", ALL_EXPENSES.length.toString()],
    ["Total", fmt(ALL_EXPENSES.reduce((s, e) => s + e.amount, 0))],
    ["Format", format],
  ].map(([k, v]) => `<div class="summary-row"><span class="summary-key">${k}</span><span class="summary-val">${v}</span></div>`).join("");

  const action = done
    ? `<div class="export-success">
        ${Icon.checkCircle(32, 'class="text-primary"')}
        <p class="export-success-title">Export Successful!</p>
        <p class="export-success-sub">July_2026_Report.${format.toLowerCase()} downloaded</p>
      </div>`
    : `<button class="btn-primary" data-action="do-export" style="margin-top:auto">${Icon.download(16)}Download ${format} Report</button>`;

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Export Report", backAction: "nav:home" })}
      <div class="form-body">
        <div>
          <p class="field-label" style="margin-bottom:12px">Format</p>
          <div class="format-grid">${formats}</div>
        </div>
        <div>
          <p class="field-label" style="margin-bottom:12px">Date Range</p>
          <div class="range-grid">
            <div><p class="range-label">From</p><div class="range-box">${Icon.calendar(13, 'class="field-icon"')}<input type="date" value="2026-07-01"/></div></div>
            <div><p class="range-label">To</p><div class="range-box">${Icon.calendar(13, 'class="field-icon"')}<input type="date" value="2026-07-21"/></div></div>
          </div>
        </div>
        <div class="summary-box">
          <p class="summary-title">Summary</p>
          ${summary}
        </div>
        ${action}
      </div>
    </div>`;
}

// ─── Search ────────────────────────────────────────────────────────────
const RECENT_SEARCHES = ["Groceries", "Netflix", "Auto", "Amazon", "Medicine"];

export function searchScreen(state) {
  const { q } = state.search;
  const dark = state.dark;
  const results = q ? ALL_EXPENSES.filter(e =>
    e.name.toLowerCase().includes(q.toLowerCase()) ||
    e.category.toLowerCase().includes(q.toLowerCase()) ||
    e.notes.toLowerCase().includes(q.toLowerCase())
  ) : [];

  let body;
  if (!q) {
    const chips = RECENT_SEARCHES.map(r => `<button class="recent-chip" data-action="set-search-q" data-q="${r}">${Icon.clock(11, 'class="field-icon"')}${r}</button>`).join("");
    const catGrid = Object.entries(CATS).map(([name, { color }]) => `
      <button class="cat-browse-btn" data-action="set-search-q" data-q="${name}">
        <div class="expense-icon" style="background:${color}18">${CATEGORY_ICON[name](15, `style="color:${color}"`)}</div>
        <div>
          <p class="cat-browse-name">${name}</p>
          <p class="cat-browse-count">${ALL_EXPENSES.filter(e => e.category === name).length} items</p>
        </div>
      </button>`).join("");
    body = `
      <div class="px-4" style="padding-top:8px">
        <p class="field-label" style="margin-bottom:12px">Recent Searches</p>
        <div class="recent-chips-wrap">${chips}</div>
        <p class="field-label" style="margin-bottom:12px">Browse Categories</p>
        <div class="cat-browse-grid">${catGrid}</div>
      </div>`;
  } else if (results.length === 0) {
    body = `<div class="empty-state">
        ${Icon.search(28, 'class="text-muted"')}
        <p class="empty-title">No results</p>
        <p class="empty-sub">No expenses match "${escapeHtml(q)}"</p>
      </div>`;
    body = `<div class="empty-state"><div class="empty-icon">${Icon.search(28, 'class="text-muted"')}</div><p class="empty-title">No results</p><p class="empty-sub">No expenses match "${escapeHtml(q)}"</p></div>`;
  } else {
    body = `
      <div class="px-4" style="flex:1">
        <p style="padding:8px 0; font-size:12px" class="text-muted">${results.length} result${results.length !== 1 ? "s" : ""} for "${escapeHtml(q)}"</p>
        <div class="list-card">${results.map(exp => expenseRow(exp, { dark })).join("")}</div>
      </div>`;
  }

  return `
    <div class="screen scrolly">
      <div class="search-topbar">
        <button class="icon-btn" data-action="nav" data-screen="home">${Icon.arrowLeft(18)}</button>
        <div class="search-field">
          ${Icon.search(14, 'class="field-icon"')}
          <input type="text" autofocus data-bind="search.q" value="${escapeHtml(q)}" placeholder="Search expenses, categories..."/>
          ${q ? `<button data-action="clear-search-q">${Icon.x(13, 'class="field-icon"')}</button>` : ""}
        </div>
      </div>
      ${body}
    </div>`;
}

// ─── Settings ──────────────────────────────────────────────────────────
function settingsRow({ icon, label, color = "#16A34A", right, action }) {
  return `
    <button class="settings-row" ${action ? `data-action="${action}"` : ""}>
      <div class="settings-row-icon" style="background:${color}18">${Icon[icon](15, `style="color:${color}"`)}</div>
      <span class="settings-row-label">${label}</span>
      ${right ?? Icon.chevronRight(14, 'class="field-icon"')}
    </button>`;
}

function toggleBtn(id, val) {
  return `
    <button class="toggle-switch" data-action="toggle" data-toggle-id="${id}" style="background:${val ? "var(--primary)" : "var(--muted)"}">
      <div class="toggle-thumb" style="transform: translateX(${val ? 22 : 2}px)"></div>
    </button>`;
}

export function settingsScreen(state) {
  const dark = state.dark;
  const { notifs, backup, pin } = state.settings;

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Settings" })}
      <button class="settings-profile-btn" data-action="nav" data-screen="profile">
        <div class="avatar-circle"><span class="heading-font">A</span></div>
        <div class="settings-profile-info">
          <p class="settings-profile-name">Arjun Sharma</p>
          <p class="settings-profile-email">arjun.sharma@gmail.com</p>
        </div>
        ${Icon.chevronRight(15, 'class="field-icon"')}
      </button>

      <div class="settings-section">
        <p class="settings-section-title">Preferences</p>
        <div class="settings-section-body">
          <button class="settings-row" data-action="toggle-dark">
            <div class="settings-row-icon" style="background:#7C3AED18">${(dark ? Icon.moon : Icon.sun)(15, 'style="color:#7C3AED"')}</div>
            <span class="settings-row-label">Dark Mode</span>
            ${toggleBtn("dark", dark)}
          </button>
          <button class="settings-row">
            <div class="settings-row-icon" style="background:#2563EB18">${Icon.bell(15, 'style="color:#2563EB"')}</div>
            <span class="settings-row-label">Notifications</span>
            ${toggleBtn("notifs", notifs)}
          </button>
          <button class="settings-row">
            <div class="settings-row-icon" style="background:#16A34A18">${Icon.globe(15, 'style="color:#16A34A"')}</div>
            <span class="settings-row-label">Currency</span>
            <span class="settings-row-right">₹ INR</span>
          </button>
          <button class="settings-row">
            <div class="settings-row-icon" style="background:#F59E0B18">${Icon.settings(15, 'style="color:#F59E0B"')}</div>
            <span class="settings-row-label">Language</span>
            <span class="settings-row-right">English</span>
          </button>
        </div>
      </div>

      <div class="settings-section">
        <p class="settings-section-title">Security</p>
        <div class="settings-section-body">
          <button class="settings-row">
            <div class="settings-row-icon" style="background:#EF444418">${Icon.lock(15, 'style="color:#EF4444"')}</div>
            <span class="settings-row-label">PIN Lock</span>
            ${toggleBtn("pin", pin)}
          </button>
          ${settingsRow({ icon: "shield", label: "Fingerprint", color: "#7C3AED" })}
          ${settingsRow({ icon: "eye", label: "Privacy Settings", color: "#64748B" })}
        </div>
      </div>

      <div class="settings-section">
        <p class="settings-section-title">Data</p>
        <div class="settings-section-body">
          <button class="settings-row">
            <div class="settings-row-icon" style="background:#16A34A18">${Icon.database(15, 'style="color:#16A34A"')}</div>
            <span class="settings-row-label">Auto Backup</span>
            ${toggleBtn("backup", backup)}
          </button>
          ${settingsRow({ icon: "refreshCw", label: "Restore Backup", color: "#2563EB" })}
          ${settingsRow({ icon: "download", label: "Export Data", color: "#F59E0B", action: "nav:export" })}
        </div>
      </div>

      <div class="settings-section">
        <p class="settings-section-title">About</p>
        <div class="settings-section-body">
          ${settingsRow({ icon: "info", label: "About Roz ka Khata", color: "#64748B", right: `<span class="settings-row-right">v2.0.1</span>` })}
          ${settingsRow({ icon: "star", label: "Rate the App", color: "#F59E0B" })}
          ${settingsRow({ icon: "mail", label: "Contact Support", color: "#2563EB" })}
        </div>
      </div>

      <div class="px-4" style="margin-bottom:32px">
        <button class="btn-danger" data-action="nav" data-screen="login">${Icon.logOut(16)}Sign Out</button>
      </div>
    </div>`;
}

// ─── Profile ───────────────────────────────────────────────────────────
export function profileScreen() {
  const maxExp = ALL_EXPENSES.reduce((a, b) => a.amount > b.amount ? a : b);

  const stats = [
    { label: "Total Tracked", val: fmt(ALL_EXPENSES.reduce((s, e) => s + e.amount, 0) + 185000), sub: "all time" },
    { label: "Monthly Avg",   val: fmt(20845), sub: "last 6 months" },
    { label: "Saved in 2026", val: fmt(68400), sub: "this year" },
    { label: "Top Expense",   val: fmt(maxExp.amount), sub: maxExp.name },
  ].map(({ label, val, sub }) => `
    <div class="stat-card">
      <p class="stat-label">${label}</p>
      <p class="stat-value">${val}</p>
      <p class="stat-sub">${sub}</p>
    </div>
  `).join("");

  const links = [
    { label: "Export All Data",     icon: "download", screen: "export",  color: "#16A34A" },
    { label: "Transaction History", icon: "clock",     screen: "history", color: "#2563EB" },
    { label: "Settings",            icon: "settings",  screen: "settings", color: "#64748B" },
  ].map(({ label, icon, screen, color }) => `
    <button class="settings-row" data-action="nav" data-screen="${screen}">
      <div class="settings-row-icon" style="background:${color}18">${Icon[icon](15, `style="color:${color}"`)}</div>
      <span class="settings-row-label">${label}</span>
      ${Icon.chevronRight(14, 'class="field-icon"')}
    </button>
  `).join("");

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Profile", rightHtml: `<button class="icon-btn" data-action="nav" data-screen="settings">${Icon.settings(16)}</button>` })}
      <div class="profile-hero">
        <div class="profile-avatar"><span class="heading-font">A</span></div>
        <h2 class="profile-name heading-font">Arjun Sharma</h2>
        <p class="profile-email">arjun.sharma@gmail.com</p>
        <div class="profile-badge">${Icon.award(12, 'class="text-primary"')}<span>Pro Member since Jan 2025</span></div>
      </div>
      <div class="stats-grid" style="margin-top:0">${stats}</div>
      <div class="streak-card">
        <span class="streak-emoji">🔥</span>
        <div><p class="streak-title">47-day tracking streak!</p><p class="streak-sub">Keep logging daily to maintain it</p></div>
      </div>
      <div class="px-4" style="margin-bottom:32px">
        <div class="list-card">${links}</div>
      </div>
    </div>`;
}

// ─── Notifications ─────────────────────────────────────────────────────
export function notificationsScreen(state) {
  const readIds = state.readNotifIds;
  const rows = NOTIFS.map(n => {
    const isRead = readIds.has(n.id);
    return `
      <button class="notif-row ${isRead ? "read" : ""}" data-action="mark-read" data-id="${n.id}">
        <div class="notif-icon" style="background:${n.color}18">${Icon[n.icon](18, `style="color:${n.color}"`)}</div>
        <div style="flex:1; min-width:0">
          <div class="notif-top">
            <p class="notif-title">${n.title}</p>
            ${!isRead ? `<div class="notif-unread-dot"></div>` : ""}
          </div>
          <p class="notif-body">${n.body}</p>
          <p class="notif-time">${n.time}</p>
        </div>
      </button>`;
  }).join("");

  const body = NOTIFS.length === 0
    ? `<div class="empty-state">
        <div class="empty-icon">${Icon.bell(28, 'class="text-muted"')}</div>
        <p class="empty-title">No notifications</p>
        <p class="empty-sub">You are all caught up!</p>
      </div>`
    : `<div style="padding:8px 0">${rows}</div>`;

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Notifications", backAction: "nav:home", rightHtml: `<button class="link-btn" data-action="mark-all-read">Read all</button>` })}
      ${body}
    </div>`;
}

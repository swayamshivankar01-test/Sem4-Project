import { Icon, CATEGORY_ICON } from "./icons.js";
import { fmt, escapeHtml, CATS } from "./data.js";

export function topBar({ title, backAction, rightHtml }) {
  const left = backAction
    ? `<button class="icon-btn" data-action="${backAction}">${Icon.arrowLeft(18)}</button>`
    : `<div class="icon-btn-spacer"></div>`;
  const right = rightHtml ?? `<div class="icon-btn-spacer"></div>`;
  return `
    <div class="topbar">
      ${left}
      <span class="topbar-title">${escapeHtml(title)}</span>
      ${right}
    </div>`;
}

export function expenseRow(exp, { dark, editable } = {}) {
  const c = CATS[exp.category];
  const iconFn = CATEGORY_ICON[exp.category];
  const actions = editable
    ? `<div class="expense-actions">
        <button class="expense-action-btn" data-action="edit-expense" data-id="${exp.id}">${Icon.edit(12)}</button>
        <button class="expense-action-btn danger" data-action="delete-expense" data-id="${exp.id}">${Icon.trash(12)}</button>
      </div>`
    : "";
  return `
    <div class="expense-row">
      <div class="expense-icon" style="background:${dark ? c.darkBg : c.bg}; color:${c.color}">${iconFn(17)}</div>
      <div class="expense-info">
        <p class="expense-name">${escapeHtml(exp.name)}</p>
        <p class="expense-meta">${exp.category} · ${exp.payment}</p>
      </div>
      ${actions}
      <span class="expense-amt">-${fmt(exp.amount)}</span>
    </div>`;
}

export function circularProgress(value, { size = 80, stroke = 8, color = "#16A34A" } = {}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return `
    <svg width="${size}" height="${size}" style="transform:rotate(-90deg)">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--muted)" stroke-width="${stroke}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"
        style="transition: stroke-dashoffset .6s ease"/>
    </svg>`;
}

export function toggleSwitch(id, val) {
  return `
    <button class="toggle-switch" data-action="toggle" data-toggle-id="${id}"
      style="background:${val ? "var(--primary)" : "var(--muted)"}">
      <div class="toggle-thumb" style="transform: translateX(${val ? 22 : 2}px)"></div>
    </button>`;
}

const NAV_TABS = [
  { key: "home",      icon: "home",     label: "Home"      },
  { key: "analytics", icon: "barChart", label: "Analytics" },
  { key: "history",   icon: "clock",    label: "History"   },
  { key: "budget",    icon: "target",   label: "Budget"    },
  { key: "profile",   icon: "user",     label: "Profile"   },
];

export function bottomNav(active) {
  return `
    <div class="bottom-nav">
      ${NAV_TABS.map(t => `
        <button class="nav-tab" data-action="nav" data-screen="${t.key}">
          <div class="nav-tab-icon ${active === t.key ? "active" : ""}" style="color:${active === t.key ? "var(--primary)" : "var(--muted-foreground)"}">
            ${Icon[t.icon](19)}
          </div>
          <span class="nav-tab-label" style="color:${active === t.key ? "var(--primary)" : "var(--muted-foreground)"}">${t.label}</span>
        </button>
      `).join("")}
    </div>`;
}

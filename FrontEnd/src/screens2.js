import { Icon, CATEGORY_ICON } from "./icons.js";
import { topBar, expenseRow, circularProgress } from "./components.js";
import { barChart, groupedBarChart, lineChart, donutChart } from "./charts.js";
import {
  CATS, ALL_EXPENSES, MONTHLY_DATA, WEEKLY_DATA, PIE_DATA, BUDGETS,
  fmt, pct, groupByDate, displayDate, escapeHtml,
} from "./data.js";

// ─── Add Expense ───────────────────────────────────────────────────────
export function addExpenseScreen(state) {
  const { amount, cat, payment, notes } = state.addExpense;

  const catChips = Object.keys(CATS).map(c => {
    const { color } = CATS[c];
    const active = cat === c;
    return `
      <button class="chip" data-action="set-add-cat" data-cat="${c}"
        style="border-color:${active ? color : "transparent"}; background:${active ? color + "18" : "var(--muted)"}; color:${active ? color : "var(--muted-foreground)"}">
        ${CATEGORY_ICON[c](12, `style="color:${active ? color : "inherit"}"`)}${c}
      </button>`;
  }).join("");

  const paymentBtns = [
    { key: "Cash", icon: "banknote",   color: "#16A34A" },
    { key: "UPI",  icon: "smartphone", color: "#2563EB" },
    { key: "Card", icon: "creditCard", color: "#7C3AED" },
  ].map(({ key, icon, color }) => {
    const active = payment === key;
    return `
      <button class="payment-btn" data-action="set-add-payment" data-payment="${key}"
        style="border-color:${active ? color : "var(--border)"}; background:${active ? color + "10" : "var(--card)"}; color:${active ? color : "var(--muted-foreground)"}">
        ${Icon[icon](18, `style="color:${active ? color : "var(--muted-foreground)"}"`)}${key}
      </button>`;
  }).join("");

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Add Expense", backAction: "nav:home" })}
      <div class="amount-hero">
        <p class="amount-hero-label">Enter Amount</p>
        <div class="amount-hero-input">
          <span class="amount-hero-sign">₹</span>
          <input type="text" inputmode="numeric" data-bind="addExpense.amount" value="${escapeHtml(amount)}"/>
        </div>
      </div>
      <div class="form-body">
        <div>
          <p class="field-label" style="margin-bottom:12px">Category</p>
          <div class="chip-wrap">${catChips}</div>
        </div>
        <div>
          <p class="field-label">Date</p>
          <div class="field-box">${Icon.calendar(15, 'class="field-icon"')}<input type="date" value="2026-07-21"/></div>
        </div>
        <div>
          <p class="field-label">Notes</p>
          <div class="field-box textarea-box">${Icon.fileText(15, 'class="field-icon" style="margin-top:2px"')}<textarea rows="2" data-bind="addExpense.notes" placeholder="Add a note...">${escapeHtml(notes)}</textarea></div>
        </div>
        <div>
          <p class="field-label" style="margin-bottom:12px">Payment Method</p>
          <div class="payment-grid">${paymentBtns}</div>
        </div>
        <button class="btn-primary" data-action="nav" data-screen="home" style="margin-top:auto">${Icon.check(16)}Save Expense</button>
      </div>
    </div>`;
}

// ─── History ───────────────────────────────────────────────────────────
const HIST_FILTERS = ["All", "Today", "Week", "Food", "Transport", "Shopping"];

export function historyScreen(state) {
  const { q, filter } = state.history;
  const dark = state.dark;

  const filtered = ALL_EXPENSES.filter(e => {
    const mQ = !q || e.name.toLowerCase().includes(q.toLowerCase()) || e.category.toLowerCase().includes(q.toLowerCase());
    const mF = filter === "All" || e.category === filter
      || (filter === "Today" && e.date === "2026-07-21")
      || (filter === "Week" && e.date >= "2026-07-15");
    return mQ && mF;
  });

  const grouped = groupByDate(filtered);
  const groupsHtml = Object.entries(grouped)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, exps]) => `
      <div>
        <div class="date-group-head">
          <span>${displayDate(date)}</span>
          <span>${fmt(exps.reduce((s, e) => s + e.amount, 0))}</span>
        </div>
        <div class="date-group-list">
          ${exps.map(exp => expenseRow(exp, { dark, editable: true })).join("")}
        </div>
      </div>
    `).join("");

  const body = filtered.length === 0
    ? `<div class="empty-state">
        <div class="empty-icon">${Icon.search(28, 'class="text-muted"')}</div>
        <p class="empty-title">No results found</p>
        <p class="empty-sub">Try different keywords or filters</p>
      </div>`
    : `<div style="flex:1; padding-bottom:16px">${groupsHtml}</div>`;

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Transactions", rightHtml: `<button class="icon-btn">${Icon.filter(14)}</button>` })}
      <div class="hist-controls">
        <div class="search-field">
          ${Icon.search(14, 'class="field-icon"')}
          <input type="text" data-bind="history.q" value="${escapeHtml(q)}" placeholder="Search expenses..."/>
          ${q ? `<button data-action="clear-hist-search">${Icon.x(13, 'class="field-icon"')}</button>` : ""}
        </div>
        <div class="filter-scroll">
          ${HIST_FILTERS.map(f => `
            <button class="filter-chip" data-action="set-hist-filter" data-filter="${f}"
              style="background:${filter === f ? "var(--primary)" : "var(--muted)"}; color:${filter === f ? "var(--primary-foreground)" : "var(--muted-foreground)"}">
              ${f}
            </button>`).join("")}
        </div>
        <div class="hist-summary">
          <span>${filtered.length} transactions</span>
          <strong>${fmt(filtered.reduce((s, e) => s + e.amount, 0))}</strong>
        </div>
      </div>
      ${body}
    </div>`;
}

// ─── Analytics ─────────────────────────────────────────────────────────
export function analyticsScreen(state) {
  const tab = state.analyticsTab;
  const total = PIE_DATA.reduce((s, d) => s + d.value, 0);
  const topCat = PIE_DATA.reduce((a, b) => a.value > b.value ? a : b);

  const statCards = [
    { label: "Monthly Total", val: fmt(total),                        icon: "wallet",     color: "#16A34A" },
    { label: "Daily Average", val: fmt(Math.round(total / 21)),       icon: "trendingUp", color: "#2563EB" },
    { label: "Top Category",  val: topCat.name,                       icon: "star",       color: "#F59E0B" },
    { label: "Transactions",  val: ALL_EXPENSES.length.toString(),    icon: "fileText",   color: "#7C3AED" },
  ].map(({ label, val, icon, color }) => `
    <div class="a-stat-card">
      <div class="a-stat-top">
        <div class="a-stat-icon" style="background:${color}18">${Icon[icon](14, `style="color:${color}"`)}</div>
        <p class="a-stat-label">${label}</p>
      </div>
      <p class="a-stat-value">${val}</p>
    </div>
  `).join("");

  const tabs = ["monthly", "weekly", "categories"].map(t => `
    <button class="tab-switch-btn ${tab === t ? "active" : ""}" data-action="set-analytics-tab" data-tab="${t}">
      ${t === "monthly" ? "Monthly" : t === "weekly" ? "Weekly" : "Categories"}
    </button>
  `).join("");

  let tabContent = "";
  if (tab === "monthly") {
    tabContent = `
      <div class="chart-card">
        <p class="chart-card-title">6-Month Trend</p>
        ${barChart(MONTHLY_DATA.map(d => ({ label: d.month, value: d.amount })), { color: "#16A34A", fmtValue: fmt })}
      </div>`;
  } else if (tab === "weekly") {
    tabContent = `
      <div class="chart-card">
        <p class="chart-card-title">This Week</p>
        ${lineChart(WEEKLY_DATA.map(d => ({ label: d.day, value: d.amount })), { color: "#16A34A", fmtValue: fmt })}
      </div>`;
  } else {
    const legend = PIE_DATA.map(d => `
      <div class="pie-legend-row">
        <div class="pie-legend-dot" style="background:${d.color}"></div>
        <span class="pie-legend-name">${d.name}</span>
        <span class="pie-legend-val">${fmt(d.value)}</span>
        <span class="pie-legend-pct">${pct(d.value, total)}%</span>
      </div>`).join("");
    tabContent = `
      <div class="chart-card">
        <p class="chart-card-title" style="margin-bottom:8px">By Category</p>
        <div style="display:flex; justify-content:center; margin-bottom:12px">
          ${donutChart(PIE_DATA, { fmtValue: fmt })}
        </div>
        ${legend}
      </div>`;
  }

  const insights = [
    { icon: "trendingDown", text: "Spending down 16% vs June",      color: "#16A34A", bg: "#F0FDF4" },
    { icon: "alertCircle",  text: "Shopping over budget by ₹1,050", color: "#EF4444", bg: "#FEF2F2" },
    { icon: "award",        text: "Food spending within budget ✓",  color: "#F59E0B", bg: "#FFFBEB" },
  ].map(({ icon, text, color, bg }) => `
    <div class="insight-row">
      <div class="insight-icon" style="background:${bg}">${Icon[icon](16, `style="color:${color}"`)}</div>
      <p class="insight-text">${text}</p>
    </div>
  `).join("");

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Analytics", rightHtml: `<button class="link-btn" data-action="nav" data-screen="comparison">Compare →</button>` })}
      <div class="analytics-stats">${statCards}</div>
      <div class="tab-switch"><div class="tab-switch-inner">${tabs}</div></div>
      ${tabContent}
      <div class="insights-wrap">
        <p class="section-title">Spending Insights</p>
        ${insights}
      </div>
    </div>`;
}

// ─── Comparison ────────────────────────────────────────────────────────
export function comparisonScreen() {
  const curr = 17840, prev = 21300;
  const diff = prev - curr;
  const compData = [
    { cat: "Food",   curr: 4850, prev: 5200 },
    { cat: "Bills",  curr: 4200, prev: 4200 },
    { cat: "Shop",   curr: 5050, prev: 3800 },
    { cat: "Travel", curr: 1820, prev: 2400 },
    { cat: "Health", curr: 1350, prev: 900  },
    { cat: "Entmt",  curr: 599,  prev: 1200 },
  ];

  const groupedData = compData.map(d => ({
    label: d.cat,
    values: [
      { name: "June", value: d.prev, color: "#CBD5E1" },
      { name: "July", value: d.curr, color: "#16A34A" },
    ],
  }));

  const summaryCards = [
    { label: "You Saved",      val: fmt(diff), sub: "vs last month",  green: true },
    { label: "Savings Rate",   val: "40.5%",   sub: "₹12,160 saved",  green: true },
    { label: "Savings Growth", val: "+39.7%",  sub: "vs Jun savings", green: true },
    { label: "Overspent",      val: "Shopping", sub: "+₹1,050 over",  green: false },
  ].map(({ label, val, sub, green }) => `
    <div class="a-stat-card">
      <p class="a-stat-label" style="margin-bottom:4px">${label}</p>
      <p class="a-stat-value" style="color:${green ? "var(--primary)" : "var(--destructive)"}">${val}</p>
      <p class="stat-sub" style="margin-top:2px">${sub}</p>
    </div>
  `).join("");

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Monthly Compare", backAction: "nav:analytics" })}
      <div class="cmp-period-row">
        <div class="cmp-period-chip"><span style="font-size:12px; font-weight:700">Jun 2026</span></div>
        <span class="cmp-vs">vs</span>
        <div class="cmp-period-chip active"><span style="font-size:12px; font-weight:700; color:var(--primary)">Jul 2026</span></div>
      </div>
      <div class="cmp-cards">
        <div class="cmp-card prev">
          <p class="cmp-card-label text-muted">June</p>
          <p class="cmp-card-amt">${fmt(prev)}</p>
          <div class="cmp-card-trend">${Icon.minus(11, 'class="text-muted"')}<span style="font-size:12px" class="text-muted">baseline</span></div>
        </div>
        <div class="cmp-card curr">
          <p class="cmp-card-label text-primary">July</p>
          <p class="cmp-card-amt">${fmt(curr)}</p>
          <div class="cmp-card-trend">${Icon.trendingDown(11, 'class="text-primary"')}<span style="font-size:12px; font-weight:600" class="text-primary">-${pct(diff, prev)}%</span></div>
        </div>
      </div>
      <div class="cmp-cards">${summaryCards}</div>
      <div style="padding:0 16px 20px">
        <p class="section-title">Category Breakdown</p>
        <div class="chart-card" style="margin:0">
          ${groupedBarChart(groupedData, { fmtValue: fmt })}
          <div class="legend-row">
            <div class="legend-item"><div class="legend-dot" style="background:#CBD5E1"></div><span class="legend-label">June</span></div>
            <div class="legend-item"><div class="legend-dot" style="background:var(--primary)"></div><span class="legend-label">July</span></div>
          </div>
        </div>
      </div>
    </div>`;
}

// ─── Budget ────────────────────────────────────────────────────────────
export function budgetScreen() {
  const totalLimit = BUDGETS.reduce((s, b) => s + b.limit, 0);
  const totalSpent = BUDGETS.reduce((s, b) => s + b.spent, 0);
  const overBudget = BUDGETS.filter(b => b.spent > b.limit);
  const p = pct(totalSpent, totalLimit);

  const alerts = overBudget.map(b => `
    <div class="alert-row">
      ${Icon.alertCircle(17, 'class="text-destructive"')}
      <div style="flex:1"><p class="alert-text-title">${b.cat} over budget</p><p class="alert-text-sub">Spent ${fmt(b.spent)} of ${fmt(b.limit)}</p></div>
      <span class="alert-amt">+${fmt(b.spent - b.limit)}</span>
    </div>
  `).join("");

  const catCards = BUDGETS.map(b => {
    const { color } = CATS[b.cat];
    const bp = pct(b.spent, b.limit);
    const over = b.spent > b.limit;
    return `
      <div class="budget-cat-card">
        <div class="budget-cat-top">
          <div class="budget-cat-icon" style="background:${color}18">${CATEGORY_ICON[b.cat](16, `style="color:${color}"`)}</div>
          <div style="flex:1">
            <div class="budget-cat-name-row">
              <span class="budget-cat-name">${b.cat}</span>
              <span class="budget-cat-amt" style="color:${over ? "var(--destructive)" : "var(--muted-foreground)"}">${fmt(b.spent)}/${fmt(b.limit)}</span>
            </div>
          </div>
        </div>
        <div class="budget-track"><div class="budget-fill" style="width:${Math.min(100, bp)}%; background:${over ? "#EF4444" : color}"></div></div>
        <div class="budget-cat-bottom">
          <span class="budget-cat-pct">${bp}% used</span>
          <span class="budget-cat-remain" style="color:${over ? "var(--destructive)" : "var(--muted-foreground)"}">${over ? `${fmt(b.spent - b.limit)} over` : `${fmt(b.limit - b.spent)} left`}</span>
        </div>
      </div>`;
  }).join("");

  return `
    <div class="screen scrolly">
      ${topBar({ title: "Budget", rightHtml: `<button class="icon-btn">${Icon.plus(17)}</button>` })}
      <div class="budget-hero">
        <div class="circular-wrap">
          ${circularProgress(p, { size: 128, stroke: 10, color: totalSpent > totalLimit ? "#EF4444" : "#16A34A" })}
          <div class="circular-center">
            <p class="circular-center-label">Used</p>
            <p class="circular-center-value heading-font">${p}%</p>
          </div>
        </div>
        <div class="budget-summary-row">
          <div class="budget-summary-item"><p>Budget</p><p>${fmt(totalLimit)}</p></div>
          <div class="budget-summary-item"><p>Spent</p><p>${fmt(totalSpent)}</p></div>
          <div class="budget-summary-item"><p>Left</p><p style="color:${totalLimit - totalSpent < 0 ? "var(--destructive)" : "var(--primary)"}">${fmt(Math.abs(totalLimit - totalSpent))}</p></div>
        </div>
      </div>
      ${overBudget.length > 0 ? `<div class="px-4" style="margin-bottom:16px">${alerts}</div>` : ""}
      <div class="px-4" style="margin-bottom:20px">
        <p class="section-title">Category Budgets</p>
        ${catCards}
      </div>
    </div>`;
}

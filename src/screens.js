import { Icon, CATEGORY_ICON } from "./icons.js";
import { topBar, expenseRow, circularProgress, toggleSwitch, bottomNav } from "./components.js";
import { barChart, groupedBarChart, lineChart, donutChart } from "./charts.js";
import {
  CATS, ALL_EXPENSES, MONTHLY_DATA, WEEKLY_DATA, PIE_DATA, BUDGETS, NOTIFS,
  fmt, pct, groupByDate, displayDate, escapeHtml,
} from "./data.js";

// ─── Splash ────────────────────────────────────────────────────────────
export function splashScreen() {
  return `
    <div class="splash">
      <div class="splash-blob-1"></div>
      <div class="splash-blob-2"></div>
      <div class="splash-icon">${Icon.wallet(38)}</div>
      <h1 class="splash-title heading-font">Roz ka Khata</h1>
      <p class="splash-sub">Track Every Rupee. Build Better Habits.</p>
      <div class="splash-dots">
        ${[0, 1, 2].map(i => `<div class="splash-dot ${i === 0 ? "active" : ""}"></div>`).join("")}
      </div>
    </div>`;
}

// ─── Onboarding ────────────────────────────────────────────────────────
const ONB_SLIDES = [
  { title: "Track Expenses",  sub: "Log every rupee you spend — from morning chai to monthly EMIs. Stay on top of daily finances effortlessly.", icon: "fileText", grad: "g0" },
  { title: "Smart Analytics", sub: "Beautiful charts reveal where your money goes each month. Spot trends and make smarter financial decisions.",  icon: "barChart", grad: "g1" },
  { title: "Budget Goals",    sub: "Set category-wise budgets, get real-time alerts, and watch your savings grow month after month.",              icon: "target",   grad: "g2" },
];

export function onboardingScreen(state) {
  const step = state.onbStep;
  const s = ONB_SLIDES[step];

  let heroExtra = "";
  if (step === 0) {
    heroExtra = `
      <div class="onb-card">
        ${[["Lunch", "₹450", "#F97316"], ["Auto Ride", "₹120", "#2563EB"], ["Groceries", "₹660", "#16A34A"]].map(([n, a, c]) => `
          <div class="onb-card-row">
            <div class="onb-card-left"><div class="onb-dot" style="background:${c}60"></div><span class="onb-card-name">${n}</span></div>
            <span class="onb-card-amt">${a}</span>
          </div>
        `).join("")}
      </div>`;
  } else if (step === 1) {
    heroExtra = `
      <div class="onb-bars">
        ${[45, 70, 55, 90, 65, 80, 50].map(h => `<div class="onb-bar" style="height:${h * 0.55}px"></div>`).join("")}
      </div>`;
  } else if (step === 2) {
    heroExtra = `
      <div class="onb-budgets">
        ${[["Food", 80], ["Bills", 93], ["Shopping", 72]].map(([cat, p]) => `
          <div class="onb-budget-row">
            <div class="onb-budget-top"><span>${cat}</span><span>${p}%</span></div>
            <div class="onb-budget-track"><div class="onb-budget-fill" style="width:${p}%"></div></div>
          </div>
        `).join("")}
      </div>`;
  }

  const actions = step < 2
    ? `<button class="btn-skip" data-action="nav" data-screen="login">Skip</button>
       <button class="btn-next" data-action="onb-next">Next →</button>`
    : `<button class="btn-next" data-action="nav" data-screen="login" style="flex:1">Get Started →</button>`;

  return `
    <div class="screen">
      <div class="onb-hero ${s.grad}">
        <div class="onb-blob-1"></div>
        <div class="onb-blob-2"></div>
        <div class="onb-icon">${Icon[s.icon](42, 'style="color:#fff"')}</div>
        ${heroExtra}
      </div>
      <div class="onb-body">
        <h2 class="onb-title heading-font">${s.title}</h2>
        <p class="onb-sub">${s.sub}</p>
        <div class="onb-dots">
          ${ONB_SLIDES.map((_, i) => `<div class="onb-dot2 ${i === step ? "active" : ""}" data-action="onb-goto" data-step="${i}"></div>`).join("")}
        </div>
        <div class="onb-actions">${actions}</div>
      </div>
    </div>`;
}

// ─── Login ─────────────────────────────────────────────────────────────
export function loginScreen(state) {
  const { email, pass, showPass } = state.login;
  return `
    <div class="screen scrolly">
      <div class="auth-header">
        <div class="auth-header-icon">${Icon.wallet(24, 'style="color:var(--primary)"')}</div>
        <h1 class="auth-title heading-font">Welcome back 👋</h1>
        <p class="auth-sub">Sign in to continue tracking</p>
      </div>
      <div class="auth-body">
        <div>
          <label class="field-label">Email</label>
          <div class="field-box">
            ${Icon.mail(15, 'class="field-icon"')}
            <input type="text" data-bind="login.email" value="${escapeHtml(email)}" placeholder="your@email.com"/>
          </div>
        </div>
        <div>
          <label class="field-label">Password</label>
          <div class="field-box">
            ${Icon.lock(15, 'class="field-icon"')}
            <input type="${showPass ? "text" : "password"}" data-bind="login.pass" value="${escapeHtml(pass)}"/>
            <button data-action="toggle-pass" data-target="login">${showPass ? Icon.eyeOff(15, 'class="field-icon"') : Icon.eye(15, 'class="field-icon"')}</button>
          </div>
        </div>
        <div class="auth-forgot">Forgot password?</div>
        <button class="btn-primary" data-action="nav" data-screen="home">Sign In</button>
        <div class="auth-divider"><div class="auth-divider-line"></div><span class="auth-divider-text">or continue with</span><div class="auth-divider-line"></div></div>
        <button class="btn-outline" data-action="nav" data-screen="home"><div class="google-dot"></div>Continue with Google</button>
        <button class="btn-ghost" data-action="nav" data-screen="home">${Icon.user(16, 'class="field-icon"')}Continue as Guest</button>
        <p class="auth-footer">No account? <span class="auth-link" data-action="nav" data-screen="signup">Sign up free</span></p>
      </div>
    </div>`;
}

// ─── Signup ────────────────────────────────────────────────────────────
export function signupScreen(state) {
  const showPass = state.signup.showPass;
  return `
    <div class="screen scrolly">
      <div class="signup-topbar">
        <button class="icon-btn" data-action="nav" data-screen="login">${Icon.arrowLeft(18)}</button>
        <h1 class="heading-font">Create Account</h1>
      </div>
      <div class="auth-body" style="padding-bottom:32px">
        <p class="auth-sub" style="margin-top:-4px">Join thousands tracking smarter 🚀</p>
        <div>
          <label class="field-label">Full Name</label>
          <div class="field-box">${Icon.user(15, 'class="field-icon"')}<input type="text" placeholder="Arjun Sharma"/></div>
        </div>
        <div>
          <label class="field-label">Email</label>
          <div class="field-box">${Icon.mail(15, 'class="field-icon"')}<input type="email" placeholder="arjun@example.com"/></div>
        </div>
        <div>
          <label class="field-label">Password</label>
          <div class="field-box">
            ${Icon.lock(15, 'class="field-icon"')}
            <input type="${showPass ? "text" : "password"}" placeholder="Min. 8 characters"/>
            <button data-action="toggle-pass" data-target="signup">${showPass ? Icon.eyeOff(15, 'class="field-icon"') : Icon.eye(15, 'class="field-icon"')}</button>
          </div>
        </div>
        <button class="btn-primary" data-action="nav" data-screen="home" style="margin-top:8px">Create Account</button>
        <div class="auth-divider"><div class="auth-divider-line"></div><span class="auth-divider-text">or</span><div class="auth-divider-line"></div></div>
        <button class="btn-outline" data-action="nav" data-screen="home"><div class="google-dot"></div>Sign up with Google</button>
        <p class="auth-footer" style="padding-bottom:0">Already have an account? <span class="auth-link" data-action="nav" data-screen="login">Sign in</span></p>
      </div>
    </div>`;
}

// ─── Home ──────────────────────────────────────────────────────────────
export function homeScreen(state) {
  const dark = state.dark;
  const todayTotal = ALL_EXPENSES.filter(e => e.date === "2026-07-21").reduce((s, e) => s + e.amount, 0);
  const monthTotal = ALL_EXPENSES.reduce((s, e) => s + e.amount, 0);
  const budget = 30000;

  const quickActions = [
    { label: "Add",     icon: "plus",       screen: "add",        color: "#16A34A", bg: "#F0FDF4" },
    { label: "Charts",  icon: "barChart",   screen: "analytics",  color: "#2563EB", bg: "#EFF6FF" },
    { label: "Export",  icon: "download",   screen: "export",     color: "#7C3AED", bg: "#F5F3FF" },
    { label: "Compare", icon: "trendingUp", screen: "comparison", color: "#F59E0B", bg: "#FFFBEB" },
  ];

  return `
    <div class="screen scrolly" style="position:relative">
      <div class="home-header">
        <div class="home-header-blob"></div>
        <div class="home-header-top">
          <div>
            <p class="home-date">Mon, 21 Jul 2026</p>
            <h2 class="home-greeting heading-font">Hey, Arjun 👋</h2>
          </div>
          <div class="home-header-actions">
            <button class="header-icon-btn" data-action="nav" data-screen="search">${Icon.search(16, 'style="color:#fff"')}</button>
            <button class="header-icon-btn" data-action="nav" data-screen="notifications">
              ${Icon.bell(16, 'style="color:#fff"')}
              <div class="notif-dot"></div>
            </button>
          </div>
        </div>
        <div class="home-balance-card">
          <p class="home-balance-label">Monthly Spending</p>
          <p class="home-balance-amt heading-font">${fmt(monthTotal)}</p>
          <div class="home-balance-row"><span>Budget used</span><span>${pct(monthTotal, budget)}%</span></div>
          <div class="home-balance-track"><div class="home-balance-fill" style="width:${pct(monthTotal, budget)}%"></div></div>
        </div>
      </div>

      <div class="stats-grid">
        ${[
          { label: "Today",        val: fmt(todayTotal),                  sub: "2 transactions" },
          { label: "Remaining",    val: fmt(budget - monthTotal),         sub: `of ${fmt(budget)}` },
          { label: "Transactions", val: ALL_EXPENSES.length.toString(),   sub: "this month" },
          { label: "Daily Avg",    val: fmt(Math.round(monthTotal / 21)), sub: "per day" },
        ].map(({ label, val, sub }) => `
          <div class="stat-card">
            <p class="stat-label">${label}</p>
            <p class="stat-value">${val}</p>
            <p class="stat-sub">${sub}</p>
          </div>
        `).join("")}
      </div>

      <div class="px-4" style="margin-bottom:16px">
        <p class="section-title">Quick Actions</p>
        <div class="qa-grid">
          ${quickActions.map(({ label, icon, screen, color, bg }) => `
            <button class="qa-btn" data-action="nav" data-screen="${screen}">
              <div class="qa-icon" style="background:${bg}">${Icon[icon](18, `style="color:${color}"`)}</div>
              <span class="qa-label">${label}</span>
            </button>
          `).join("")}
        </div>
      </div>

      <div class="recent-wrap">
        <div class="recent-head">
          <p class="section-title" style="margin:0">Recent Expenses</p>
          <button class="link-btn" data-action="nav" data-screen="history">View all</button>
        </div>
        <div class="list-card">
          ${ALL_EXPENSES.slice(0, 5).map(exp => expenseRow(exp, { dark })).join("")}
        </div>
      </div>

      <div class="spacer-h24"></div>

      <button class="fab" data-action="nav" data-screen="add">${Icon.plus(24, 'style="color:var(--primary-foreground)"')}</button>
    </div>`;
}

export { CATS, CATEGORY_ICON, bottomNav };

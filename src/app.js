import { Icon } from "./icons.js";
import { bottomNav } from "./components.js";
import { attachChartTooltips } from "./charts.js";
import { splashScreen, onboardingScreen, loginScreen, signupScreen, homeScreen } from "./screens.js";
import { addExpenseScreen, historyScreen, analyticsScreen, comparisonScreen, budgetScreen } from "./screens2.js";
import { exportScreen, searchScreen, settingsScreen, profileScreen, notificationsScreen } from "./screens3.js";

const MAIN_TABS = ["home", "analytics", "history", "budget", "profile"];

function getByPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}
function setByPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((o, k) => o[k], obj);
  target[last] = value;
}

const FRAME_W = 390;
const FRAME_H = 844;
const FRAME_MARGIN = 32; // matches .app-outer's 16px padding on each side

function updatePhoneScale() {
  const availW = window.innerWidth - FRAME_MARGIN;
  const availH = window.innerHeight - FRAME_MARGIN;
  const scale = Math.min(1, availW / FRAME_W, availH / FRAME_H);
  document.documentElement.style.setProperty("--phone-scale", scale.toFixed(4));
}

export function mountApp(root) {
  // ── Application state (plain JS object; no React state) ──
  const state = {
    screen: "splash",
    dark: false,
    onbStep: 0,
    login: { email: "arjun.sharma@gmail.com", pass: "secret123", showPass: false },
    signup: { showPass: false },
    addExpense: { amount: "450", cat: "Food", payment: "UPI", notes: "" },
    history: { q: "", filter: "All" },
    analyticsTab: "monthly",
    exportScreen: { format: "PDF", done: false },
    search: { q: "" },
    settings: { notifs: true, backup: true, pin: false },
    readNotifIds: new Set(),
  };

  let splashTimer = null;

  function screenHtml() {
    switch (state.screen) {
      case "splash": return splashScreen();
      case "onboarding": return onboardingScreen(state);
      case "login": return loginScreen(state);
      case "signup": return signupScreen(state);
      case "home": return homeScreen(state);
      case "add": return addExpenseScreen(state);
      case "history": return historyScreen(state);
      case "analytics": return analyticsScreen(state);
      case "comparison": return comparisonScreen();
      case "budget": return budgetScreen();
      case "export": return exportScreen(state);
      case "search": return searchScreen(state);
      case "settings": return settingsScreen(state);
      case "profile": return profileScreen();
      case "notifications": return notificationsScreen(state);
      default: return homeScreen(state);
    }
  }

  function render() {
    document.documentElement.classList.toggle("dark", state.dark);

    const activeTab = MAIN_TABS.includes(state.screen) ? state.screen : "home";
    const navHtml = MAIN_TABS.includes(state.screen)
      ? bottomNav(activeTab)
      : `<div class="home-indicator"><div class="home-indicator-bar"></div></div>`;

    root.innerHTML = `
      <div class="app-outer ${state.dark ? "dark-bg" : "light"}">
        <div class="phone-frame">
          <div class="dynamic-island"></div>
          <div class="status-bar">
            <span class="status-time heading-font">9:41</span>
            <div class="status-icons">
              <div class="signal-bars">
                ${[2, 3, 4, 4].map(h => `<div style="height:${h * 2.5}px"></div>`).join("")}
              </div>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M7 2C9.2 2 11.2 2.9 12.6 4.3L14 2.8C12.2 1 9.7 0 7 0S1.8 1 0 2.8L1.4 4.3C2.8 2.9 4.8 2 7 2Z" fill="var(--foreground)" opacity="0.8"/>
                <path d="M7 5C8.5 5 9.9 5.6 10.9 6.6L12.3 5.1C10.9 3.8 9 3 7 3S3.1 3.8 1.7 5.1L3.1 6.6C4.1 5.6 5.5 5 7 5Z" fill="var(--foreground)" opacity="0.5"/>
                <circle cx="7" cy="9" r="1.5" fill="var(--foreground)" opacity="0.8"/>
              </svg>
              <div class="battery"><div class="battery-fill"></div><div class="battery-tip"></div></div>
            </div>
          </div>
          <div class="content-area">
            <div class="content-scroll" id="screen-root">${screenHtml()}</div>
          </div>
          ${navHtml}
        </div>
        <div class="screen-badge">${state.screen} screen</div>
      </div>
    `;

    // Wire up two-way data bindings for inputs on this render
    root.querySelectorAll("[data-bind]").forEach(el => {
      const path = el.getAttribute("data-bind");
      el.addEventListener("input", () => {
        let val = el.value;
        if (path === "addExpense.amount") val = val.replace(/\D/g, "");
        setByPath(state, path, val);
        // Re-render only when necessary fields affect other UI (amount doesn't), but for
        // simplicity and correctness we re-render fully; caret position is restored below.
        const selStart = el.selectionStart;
        const focusedPath = path;
        render();
        const newEl = root.querySelector(`[data-bind="${focusedPath}"]`);
        if (newEl) {
          newEl.focus();
          try { newEl.setSelectionRange(selStart, selStart); } catch (_) {}
        }
      });
    });

    attachChartTooltips(root);
  }

  function scheduleSplashAdvance() {
    clearTimeout(splashTimer);
    if (state.screen === "splash") {
      splashTimer = setTimeout(() => {
        state.screen = "onboarding";
        render();
      }, 2800);
    }
  }

  // ── Single delegated click handler for the whole app ──
  function handleClick(e) {
    const el = e.target.closest("[data-action]");
    if (!el) return;
    const action = el.getAttribute("data-action");

    switch (action) {
      case "nav": {
        state.screen = el.getAttribute("data-screen");
        render();
        scheduleSplashAdvance();
        break;
      }
      case "nav:home": state.screen = "home"; render(); break;
      case "nav:analytics": state.screen = "analytics"; render(); break;
      case "nav:export": state.screen = "export"; render(); break;
      case "onb-next": {
        state.onbStep = Math.min(2, state.onbStep + 1);
        render();
        break;
      }
      case "onb-goto": {
        state.onbStep = parseInt(el.getAttribute("data-step"), 10);
        render();
        break;
      }
      case "toggle-pass": {
        const target = el.getAttribute("data-target");
        state[target].showPass = !state[target].showPass;
        render();
        break;
      }
      case "toggle-dark": {
        state.dark = !state.dark;
        render();
        break;
      }
      case "toggle": {
        const id = el.getAttribute("data-toggle-id");
        if (id === "dark") state.dark = !state.dark;
        else state.settings[id] = !state.settings[id];
        render();
        break;
      }
      case "set-add-cat": {
        state.addExpense.cat = el.getAttribute("data-cat");
        render();
        break;
      }
      case "set-add-payment": {
        state.addExpense.payment = el.getAttribute("data-payment");
        render();
        break;
      }
      case "set-hist-filter": {
        state.history.filter = el.getAttribute("data-filter");
        render();
        break;
      }
      case "clear-hist-search": {
        state.history.q = "";
        render();
        break;
      }
      case "set-analytics-tab": {
        state.analyticsTab = el.getAttribute("data-tab");
        render();
        break;
      }
      case "set-export-format": {
        state.exportScreen.format = el.getAttribute("data-format");
        render();
        break;
      }
      case "do-export": {
        state.exportScreen.done = true;
        render();
        break;
      }
      case "set-search-q": {
        state.search.q = el.getAttribute("data-q");
        render();
        break;
      }
      case "clear-search-q": {
        state.search.q = "";
        render();
        break;
      }
      case "mark-read": {
        state.readNotifIds.add(el.getAttribute("data-id"));
        render();
        break;
      }
      case "mark-all-read": {
        state.readNotifIds = new Set(["1", "2", "3", "4", "5", "6"]);
        render();
        break;
      }
      case "edit-expense":
      case "delete-expense":
        // No-op placeholders, matching original design's stubbed handlers.
        break;
      default:
        break;
    }
  }

  root.addEventListener("click", handleClick);
  updatePhoneScale();
  window.addEventListener("resize", updatePhoneScale);
  render();
  scheduleSplashAdvance();

  // Teardown function returned to React's useEffect cleanup
  return () => {
    clearTimeout(splashTimer);
    root.removeEventListener("click", handleClick);
    window.removeEventListener("resize", updatePhoneScale);
  };
}

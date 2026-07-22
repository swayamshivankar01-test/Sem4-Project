// ─── Static data (ported 1:1 from the original App.tsx) ──────────────────

export const CATS = {
  Food:          { color: "#F97316", bg: "#FFF7ED", darkBg: "#431407", icon: "coffee" },
  Transport:     { color: "#2563EB", bg: "#EFF6FF", darkBg: "#1e3a5f", icon: "car" },
  Bills:         { color: "#7C3AED", bg: "#F5F3FF", darkBg: "#2e1065", icon: "zap" },
  Shopping:      { color: "#EC4899", bg: "#FDF2F8", darkBg: "#500724", icon: "shoppingBag" },
  Health:        { color: "#EF4444", bg: "#FEF2F2", darkBg: "#450a0a", icon: "heart" },
  Entertainment: { color: "#F59E0B", bg: "#FFFBEB", darkBg: "#451a03", icon: "film" },
  Other:         { color: "#64748B", bg: "#F8FAFC", darkBg: "#1e293b", icon: "package" },
};

export const ALL_EXPENSES = [
  { id: "1",  name: "Lunch",         amount: 450,  category: "Food",          date: "2026-07-21", notes: "Sharma Dhaba biryani",         payment: "UPI"  },
  { id: "2",  name: "Auto Ride",     amount: 120,  category: "Transport",     date: "2026-07-21", notes: "Office commute",               payment: "Cash" },
  { id: "3",  name: "Electricity",   amount: 2400, category: "Bills",         date: "2026-07-20", notes: "MSEDCL July bill",             payment: "UPI"  },
  { id: "4",  name: "Amazon Order",  amount: 1850, category: "Shopping",      date: "2026-07-20", notes: "Phone case + lightning cable", payment: "Card" },
  { id: "5",  name: "Chai & Snacks", amount: 80,   category: "Food",          date: "2026-07-19", notes: "Evening break at tapri",       payment: "Cash" },
  { id: "6",  name: "Netflix",       amount: 599,  category: "Entertainment", date: "2026-07-19", notes: "Monthly subscription",         payment: "Card" },
  { id: "7",  name: "Medicine",      amount: 350,  category: "Health",        date: "2026-07-18", notes: "Vitamin D3 + zinc tablets",    payment: "UPI"  },
  { id: "8",  name: "Groceries",     amount: 660,  category: "Food",          date: "2026-07-18", notes: "DMart weekly shop",            payment: "UPI"  },
  { id: "9",  name: "Petrol",        amount: 200,  category: "Transport",     date: "2026-07-17", notes: "Activa half tank",             payment: "Cash" },
  { id: "10", name: "Myntra Shirts", amount: 3200, category: "Shopping",      date: "2026-07-16", notes: "2 formal shirts on sale",      payment: "Card" },
  { id: "11", name: "Dinner",        amount: 720,  category: "Food",          date: "2026-07-16", notes: "Anniversary dinner",           payment: "Card" },
  { id: "12", name: "Internet Bill", amount: 699,  category: "Bills",         date: "2026-07-15", notes: "Jio broadband monthly",        payment: "UPI"  },
  { id: "13", name: "Movie Tickets", amount: 520,  category: "Entertainment", date: "2026-07-14", notes: "Kalki 2898 AD IMAX",           payment: "Card" },
  { id: "14", name: "Doctor Visit",  amount: 500,  category: "Health",        date: "2026-07-13", notes: "General checkup",              payment: "Cash" },
  { id: "15", name: "Metro Card",    amount: 300,  category: "Transport",     date: "2026-07-12", notes: "Monthly recharge",             payment: "UPI"  },
];

export const MONTHLY_DATA = [
  { month: "Feb", amount: 18500, prev: 16200 },
  { month: "Mar", amount: 22000, prev: 18500 },
  { month: "Apr", amount: 19800, prev: 22000 },
  { month: "May", amount: 25600, prev: 19800 },
  { month: "Jun", amount: 21300, prev: 25600 },
  { month: "Jul", amount: 17840, prev: 21300 },
];

export const WEEKLY_DATA = [
  { day: "Mon", amount: 520  },
  { day: "Tue", amount: 1850 },
  { day: "Wed", amount: 680  },
  { day: "Thu", amount: 2400 },
  { day: "Fri", amount: 1200 },
  { day: "Sat", amount: 3100 },
  { day: "Sun", amount: 890  },
];

export const PIE_DATA = [
  { name: "Food",          value: 4850, color: "#F97316" },
  { name: "Transport",     value: 1820, color: "#2563EB" },
  { name: "Bills",         value: 4200, color: "#7C3AED" },
  { name: "Shopping",      value: 5050, color: "#EC4899" },
  { name: "Health",        value: 1350, color: "#EF4444" },
  { name: "Entertainment", value: 599,  color: "#F59E0B" },
];

export const BUDGETS = [
  { cat: "Food",          limit: 6000, spent: 4850 },
  { cat: "Transport",     limit: 2500, spent: 1820 },
  { cat: "Bills",         limit: 4500, spent: 4200 },
  { cat: "Shopping",      limit: 4000, spent: 5050 },
  { cat: "Health",        limit: 2000, spent: 1350 },
  { cat: "Entertainment", limit: 1000, spent: 599  },
];

export const NOTIFS = [
  { id: "1", icon: "checkCircle", title: "Expense Added",     body: "₹450 for Lunch tracked successfully",              time: "2 min ago",  color: "#22C55E" },
  { id: "2", icon: "alertCircle", title: "Budget Alert!",     body: "Shopping budget 126% exceeded this month",         time: "1 hr ago",   color: "#EF4444" },
  { id: "3", icon: "database",    title: "Backup Complete",   body: "Your data has been backed up to cloud",            time: "3 hrs ago",  color: "#2563EB" },
  { id: "4", icon: "download",    title: "Export Successful", body: "July 2026 report exported as PDF",                 time: "Yesterday",  color: "#22C55E" },
  { id: "5", icon: "alertCircle", title: "Bills Due Soon",    body: "Mobile postpaid bill due in 3 days",               time: "2 days ago", color: "#F59E0B" },
  { id: "6", icon: "award",       title: "Savings Streak",    body: "You saved 15% more than last month! Great work 🎉", time: "3 days ago", color: "#7C3AED" },
];

// ─── Helpers ───────────────────────────────────────────────────────────

export const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
export const pct = (a, b) => Math.min(100, Math.round((a / b) * 100));

export const groupByDate = (exps) => {
  const map = {};
  exps.forEach(e => { (map[e.date] ??= []).push(e); });
  return map;
};

export const displayDate = (d) => {
  const diff = Math.round((new Date("2026-07-21").getTime() - new Date(d).getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

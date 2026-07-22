// Plain-JS / hand-built SVG chart renderers (replaces recharts).
// Each function returns an SVG markup string sized to fill its container,
// plus data-* attributes on bars/points/slices so a single delegated
// mouseover/mouseout listener (wired up in app.js) can show a tooltip.

function fmtK(v) {
  return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K`;
}

// Simple vertical bar chart. data: [{label, value}]
export function barChart(data, { width = 320, height = 160, color = "#16A34A", fmtValue }) {
  const padL = 30, padB = 20, padT = 8, padR = 4;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const max = Math.max(...data.map(d => d.value)) * 1.15;
  const barW = chartW / data.length * 0.55;
  const gap = chartW / data.length;

  let bars = "";
  let labels = "";
  data.forEach((d, i) => {
    const h = (d.value / max) * chartH;
    const x = padL + i * gap + (gap - barW) / 2;
    const y = padT + chartH - h;
    bars += `<rect data-tip="${d.label}: ${fmtValue ? fmtValue(d.value) : d.value}" x="${x}" y="${y}" width="${barW}" height="${h}" rx="5" fill="${d.color || color}" class="chart-el" style="cursor:pointer"/>`;
    labels += `<text x="${x + barW / 2}" y="${height - 4}" font-size="10" fill="var(--muted-foreground)" text-anchor="middle">${d.label}</text>`;
  });

  // y-axis ticks (3 lines)
  let yTicks = "";
  for (let i = 0; i <= 2; i++) {
    const val = (max / 2) * i;
    const y = padT + chartH - (val / max) * chartH;
    yTicks += `<text x="${padL - 6}" y="${y + 3}" font-size="9" fill="var(--muted-foreground)" text-anchor="end">${fmtK(val)}</text>`;
  }

  return `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="chart-svg">${yTicks}${bars}${labels}</svg>`;
}

// Grouped (paired) bar chart. data: [{label, values:[{value,color}]}]
export function groupedBarChart(data, { width = 320, height = 170, fmtValue }) {
  const padL = 30, padB = 20, padT = 8, padR = 4;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const max = Math.max(...data.flatMap(d => d.values.map(v => v.value))) * 1.15;
  const gap = chartW / data.length;
  const groupW = gap * 0.62;
  const barW = groupW / 2 - 2;

  let bars = "", labels = "", yTicks = "";
  for (let i = 0; i <= 2; i++) {
    const val = (max / 2) * i;
    const y = padT + chartH - (val / max) * chartH;
    yTicks += `<text x="${padL - 6}" y="${y + 3}" font-size="9" fill="var(--muted-foreground)" text-anchor="end">${fmtK(val)}</text>`;
  }
  data.forEach((d, i) => {
    const groupX = padL + i * gap + (gap - groupW) / 2;
    d.values.forEach((v, j) => {
      const h = (v.value / max) * chartH;
      const x = groupX + j * (barW + 4);
      const y = padT + chartH - h;
      bars += `<rect data-tip="${v.name}: ${fmtValue ? fmtValue(v.value) : v.value}" x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${v.color}" class="chart-el" style="cursor:pointer"/>`;
    });
    labels += `<text x="${groupX + groupW / 2}" y="${height - 4}" font-size="10" fill="var(--muted-foreground)" text-anchor="middle">${d.label}</text>`;
  });

  return `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="chart-svg">${yTicks}${bars}${labels}</svg>`;
}

// Line chart with dots. data: [{label, value}]
export function lineChart(data, { width = 320, height = 160, color = "#16A34A", fmtValue }) {
  const padL = 30, padB = 20, padT = 10, padR = 8;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;
  const max = Math.max(...data.map(d => d.value)) * 1.15;
  const min = 0;
  const stepX = chartW / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padL + i * stepX;
    const y = padT + chartH - ((d.value - min) / (max - min)) * chartH;
    return { x, y, d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  let yTicks = "";
  for (let i = 0; i <= 2; i++) {
    const val = (max / 2) * i;
    const y = padT + chartH - (val / max) * chartH;
    yTicks += `<text x="${padL - 6}" y="${y + 3}" font-size="9" fill="var(--muted-foreground)" text-anchor="end">${fmtK(val)}</text>`;
  }

  let labels = "", dots = "";
  points.forEach(p => {
    labels += `<text x="${p.x}" y="${height - 4}" font-size="10" fill="var(--muted-foreground)" text-anchor="middle">${p.d.label}</text>`;
    dots += `<circle data-tip="${p.d.label}: ${fmtValue ? fmtValue(p.d.value) : p.d.value}" cx="${p.x}" cy="${p.y}" r="9" fill="transparent" class="chart-el" style="cursor:pointer"/>
      <circle cx="${p.x}" cy="${p.y}" r="4" fill="${color}" stroke="var(--card)" stroke-width="0" pointer-events="none"/>`;
  });

  return `<svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" class="chart-svg">
    ${yTicks}
    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${dots}
    ${labels}
  </svg>`;
}

// Donut / pie chart. data: [{name, value, color}]
export function donutChart(data, { size = 190, inner = 52, outer = 85, fmtValue }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2, cy = size / 2;
  let angle = -90; // start at top
  let slices = "";

  data.forEach(d => {
    const sweep = (d.value / total) * 360;
    const startAngle = angle;
    const endAngle = angle + sweep;
    slices += arcSlice(cx, cy, inner, outer, startAngle, endAngle, d.color, `${d.name}: ${fmtValue ? fmtValue(d.value) : d.value}`);
    angle = endAngle;
  });

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="chart-svg">${slices}</svg>`;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcSlice(cx, cy, innerR, outerR, startAngle, endAngle, color, tip) {
  // Guard against a full 360 slice (single category)
  const isFull = endAngle - startAngle >= 359.99;
  if (isFull) {
    return `<circle data-tip="${tip}" cx="${cx}" cy="${cy}" r="${(innerR + outerR) / 2}" fill="none" stroke="${color}" stroke-width="${outerR - innerR}" class="chart-el" style="cursor:pointer"/>`;
  }
  const large = endAngle - startAngle > 180 ? 1 : 0;
  const p1o = polarToCartesian(cx, cy, outerR, startAngle);
  const p2o = polarToCartesian(cx, cy, outerR, endAngle);
  const p1i = polarToCartesian(cx, cy, innerR, endAngle);
  const p2i = polarToCartesian(cx, cy, innerR, startAngle);
  const path = [
    `M ${p1o.x} ${p1o.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${p2o.x} ${p2o.y}`,
    `L ${p1i.x} ${p1i.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${p2i.x} ${p2i.y}`,
    "Z",
  ].join(" ");
  return `<path data-tip="${tip}" d="${path}" fill="${color}" class="chart-el" style="cursor:pointer"/>`;
}

// Delegated tooltip behaviour: call once after inserting chart HTML into the DOM.
export function attachChartTooltips(container) {
  let tooltipEl = null;

  const show = (e) => {
    const el = e.target.closest(".chart-el");
    if (!el) return;
    const tip = el.getAttribute("data-tip");
    if (!tip) return;
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.className = "chart-tooltip";
      document.body.appendChild(tooltipEl);
    }
    tooltipEl.textContent = tip;
    tooltipEl.style.display = "block";
    positionTooltip(e);
  };

  const positionTooltip = (e) => {
    if (!tooltipEl) return;
    tooltipEl.style.left = `${e.clientX + 12}px`;
    tooltipEl.style.top = `${e.clientY - 10}px`;
  };

  const hide = (e) => {
    const el = e.target.closest(".chart-el");
    if (!el) return;
    if (tooltipEl) tooltipEl.style.display = "none";
  };

  container.addEventListener("mouseover", show);
  container.addEventListener("mousemove", positionTooltip);
  container.addEventListener("mouseout", hide);
}

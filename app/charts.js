// Minimal canvas charts, dependency-free. Every chart is drawn from the numbers
// in data.js and is followed in the page by a table with the same numbers.
const NAVY = '#12395b';
const RED = '#bc002d';
const GRID = '#e3e8ee';
const AXIS = '#8a97a5';

function setup(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, w, h: height };
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step0 = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const norm = step0 / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step * 0.001; v += step) ticks.push(v);
  return { lo, hi, ticks };
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return v.toLocaleString('en-US');
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1).replace(/\.0$/, '');
}

export function lineChart(canvas, labels, values, opts = {}) {
  const height = opts.height || 260;
  const { ctx, w, h } = setup(canvas, height);
  const pad = { l: 56, r: 14, t: 14, b: 30 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (opts.min !== undefined) min = opts.min;
  if (opts.max !== undefined) max = opts.max;
  const padY = (max - min) * 0.12 || 1;
  min -= padY;
  max += padY;
  const { ticks } = niceTicks(min, max);
  const yOf = (v) => pad.t + ih - ((v - min) / (max - min)) * ih;
  const xOf = (i) => pad.l + (values.length === 1 ? iw / 2 : (i / (values.length - 1)) * iw);

  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of ticks) {
    const y = yOf(t);
    if (y < pad.t - 2 || y > pad.t + ih + 2) continue;
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillStyle = AXIS;
    ctx.fillText(fmtTick(t), pad.l - 8, y);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((lab, i) => {
    if (i % Math.ceil(labels.length / 6) !== 0 && i !== labels.length - 1) return;
    ctx.fillStyle = AXIS;
    ctx.fillText(String(lab), xOf(i), pad.t + ih + 8);
  });
  // Area + line.
  const color = opts.color || NAVY;
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xOf(i), yOf(v)) : ctx.lineTo(xOf(i), yOf(v))));
  ctx.lineTo(xOf(values.length - 1), pad.t + ih);
  ctx.lineTo(xOf(0), pad.t + ih);
  ctx.closePath();
  ctx.fillStyle = color + '1a';
  ctx.fill();
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xOf(i), yOf(v)) : ctx.lineTo(xOf(i), yOf(v))));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();
  // Points + last value label.
  ctx.fillStyle = color;
  values.forEach((v, i) => {
    ctx.beginPath();
    ctx.arc(xOf(i), yOf(v), i === values.length - 1 ? 4.5 : 3, 0, Math.PI * 2);
    ctx.fill();
  });
  const last = values[values.length - 1];
  ctx.fillStyle = color;
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText((opts.format ? opts.format(last) : fmtTick(last)) + (opts.unitSuffix || ''), w - pad.r - 2, yOf(last) - 8);
}

export function barChart(canvas, labels, values, opts = {}) {
  const height = opts.height || 260;
  const { ctx, w, h } = setup(canvas, height);
  const pad = { l: 56, r: 14, t: 14, b: 30 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const max = Math.max(...values) * 1.12;
  const min = Math.min(0, ...values) * 1.1;
  const { ticks } = niceTicks(min, max);
  const yOf = (v) => pad.t + ih - ((v - min) / (max - min)) * ih;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  for (const t of ticks) {
    const y = yOf(t);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(w - pad.r, y);
    ctx.stroke();
    ctx.fillStyle = AXIS;
    ctx.fillText(fmtTick(t), pad.l - 8, y);
  }
  const slot = iw / values.length;
  const bw = Math.min(46, slot * 0.62);
  values.forEach((v, i) => {
    const x = pad.l + slot * i + (slot - bw) / 2;
    const y = yOf(Math.max(v, 0));
    const y0 = yOf(0);
    ctx.fillStyle = v < 0 ? RED : opts.color || NAVY;
    ctx.fillRect(x, Math.min(y, y0), bw, Math.abs(y0 - y));
    ctx.fillStyle = '#33414f';
    ctx.font = '12px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText(opts.format ? opts.format(v) : fmtTick(v), x + bw / 2, Math.min(y, y0) - 4);
  });
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = AXIS;
  labels.forEach((lab, i) => {
    if (i % Math.ceil(labels.length / 6) !== 0 && i !== labels.length - 1) return;
    ctx.fillText(String(lab), pad.l + slot * i + slot / 2, pad.t + ih + 8);
  });
}

export function hbarChart(canvas, rows, opts = {}) {
  // rows: [{label, value}] horizontal bars.
  const rowH = 34;
  const height = rows.length * rowH + 16;
  const { ctx, w, h } = setup(canvas, height);
  const pad = { l: 150, r: 64, t: 8, b: 8 };
  const iw = w - pad.l - pad.r;
  const max = Math.max(...rows.map((r) => r.value)) * 1.08;
  ctx.font = '13px system-ui, sans-serif';
  rows.forEach((r, i) => {
    const y = pad.t + i * rowH;
    ctx.fillStyle = '#33414f';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(r.label, pad.l - 10, y + 13);
    ctx.fillStyle = '#eef1f4';
    ctx.fillRect(pad.l, y, iw, 22);
    ctx.fillStyle = opts.color || NAVY;
    ctx.fillRect(pad.l, y, Math.max(2, (r.value / max) * iw), 22);
    ctx.fillStyle = '#12395b';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(opts.format ? opts.format(r.value) : fmtTick(r.value), pad.l + (r.value / max) * iw + 8, y + 13);
    ctx.font = '13px system-ui, sans-serif';
  });
}

export function groupedBars(canvas, groups, opts = {}) {
  // groups: [{label, a, b}] two series, e.g. Japan vs OECD.
  const rowH = 40;
  const height = groups.length * rowH + 34;
  const { ctx, w, h } = setup(canvas, height);
  const pad = { l: 110, r: 16, t: 22, b: 8 };
  const iw = w - pad.l - pad.r;
  const max = Math.max(...groups.flatMap((g) => [g.a, g.b])) * 1.1;
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = NAVY;
  ctx.fillRect(pad.l, 4, 12, 12);
  ctx.fillStyle = '#33414f';
  ctx.fillText(opts.aLabel || 'Japan', pad.l + 18, 10);
  ctx.fillStyle = '#b8c2cc';
  ctx.fillRect(pad.l + 90, 4, 12, 12);
  ctx.fillStyle = '#33414f';
  ctx.fillText(opts.bLabel || 'OECD average', pad.l + 108, 10);
  groups.forEach((g, i) => {
    const y = pad.t + i * rowH;
    ctx.fillStyle = '#33414f';
    ctx.textAlign = 'right';
    ctx.font = '13px system-ui, sans-serif';
    ctx.fillText(g.label, pad.l - 10, y + 14);
    ctx.fillStyle = NAVY;
    ctx.fillRect(pad.l, y, (g.a / max) * iw, 13);
    ctx.fillStyle = '#b8c2cc';
    ctx.fillRect(pad.l, y + 15, (g.b / max) * iw, 13);
    ctx.fillStyle = NAVY;
    ctx.font = 'bold 12px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(String(g.a), pad.l + (g.a / max) * iw + 6, y + 7);
    ctx.fillStyle = '#5a6a7a';
    ctx.fillText(String(g.b), pad.l + (g.b / max) * iw + 6, y + 22);
  });
}

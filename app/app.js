// Japan by the Numbers — router and views. All content is rendered from data.js;
// every chart is followed by a table with the same numbers.
import * as D from './data.js';
import { lineChart, barChart, hbarChart, groupedBars } from './charts.js';

const app = document.getElementById('app');
const searchInput = document.getElementById('site-search');
const searchResults = document.getElementById('search-results');

const NAV = [
  ['#/', 'Overview'],
  ['#\/population', 'Population'],
  ['#\/economy', 'Economy'],
  ['#\/health', 'Health'],
  ['#\/education', 'Education'],
  ['#\/regions', 'Regions'],
  ['#\/compare', 'Compare'],
  ['#\/sources', 'Sources'],
];

function navHtml(active) {
  return NAV.map(([href, label]) =>
    `<a href="${href}" class="${href === active ? 'active' : ''}">${label}</a>`).join('');
}

function sourceNote(text) {
  return `<p class="src">Source: ${text}</p>`;
}

function tableHtml(headers, rows) {
  return `<div class="tablewrap"><table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>` +
    `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function seriesTable(series, format) {
  const rows = D.YEARS.map((y, i) => [y, format ? format(series.values[i]) : series.values[i]]);
  return tableHtml(['Year', series.label + ' (' + series.unit + ')'], rows);
}

function kpiCards() {
  return `<section class="kpis">` + D.HEADLINE.map((k) => `
    <article class="kpi">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-change">${k.change}</div>
      <div class="kpi-note">${k.note}</div>
    </article>`).join('') + `</section>`;
}

// ---------- Overview ----------
function viewHome() {
  const top5 = D.PREFECTURES.slice(0, 5);
  app.innerHTML = `
  <section class="hero">
    <p class="eyebrow">National statistics of Japan · 日本の統計</p>
    <h1>Japan by the Numbers</h1>
    <p class="lede">One place to explore Japan’s people, economy, health and education —
    official figures, shown plainly, with the source of every number.</p>
  </section>
  ${kpiCards()}
  <section class="card">
    <div class="card-head"><h2>Ten years at a glance</h2>
      <div class="seg" role="group" aria-label="Choose indicator">
        <button data-metric="pop" class="on">Population</button>
        <button data-metric="gdp">GDP</button>
        <button data-metric="unemp">Unemployment</button>
        <button data-metric="cpi">Inflation</button>
      </div>
    </div>
    <canvas id="main-chart" aria-label="Chart of the selected indicator, 2015 to 2024"></canvas>
    <div id="main-table"></div>
    <p class="src" id="main-source"></p>
  </section>
  <div class="grid2">
    <section class="card">
      <h2>Largest prefectures</h2>
      <p class="muted">Population, 1 October 2024 estimates.</p>
      ${tableHtml(['Prefecture', 'Population', 'Density /km²'],
        top5.map((p) => [p.name, (p.pop / 1000).toFixed(2) + 'm', p.density.toLocaleString('en-US')]))}
      <p><a class="btn" href="#/regions">All prefectures →</a></p>
    </section>
    <section class="card">
      <h2>Latest updates</h2>
      <ul class="updates">${D.UPDATES.map((u) => `<li><time>${u.date}</time>${u.text}</li>`).join('')}</ul>
    </section>
  </div>
  <section class="card">
    <h2>Find an indicator</h2>
    <p class="muted">Type to filter all 16 headline indicators, then jump to its page.</p>
    <input id="finder" class="finder" type="search" placeholder="Try “fertility”, “GDP”, “beds”…" aria-label="Filter indicators">
    <ul id="finder-list" class="finder-list"></ul>
  </section>`;

  const METRICS = {
    pop: { series: D.POPULATION, format: (v) => v.toFixed(1) + 'm' },
    gdp: { series: D.GDP_NOMINAL, format: (v) => '$' + v.toLocaleString('en-US') + 'bn' },
    unemp: { series: D.UNEMPLOYMENT, format: (v) => v.toFixed(1) + '%' },
    cpi: { series: D.CPI, format: (v) => v.toFixed(1) + '%' },
  };
  let current = 'pop';
  const draw = () => {
    const m = METRICS[current];
    const c = document.getElementById('main-chart');
    if (!c) return;
    if (current === 'pop' || current === 'gdp') lineChart(c, D.YEARS, m.series.values, { format: m.format });
    else barChart(c, D.YEARS, m.series.values, { format: m.format, color: current === 'cpi' ? '#bc002d' : '#12395b' });
    document.getElementById('main-table').innerHTML = seriesTable(m.series, m.format);
    document.getElementById('main-source').textContent = 'Source: ' + m.series.source + '.';
  };
  draw();
  document.querySelectorAll('.seg button').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.seg button').forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
      current = b.dataset.metric;
      draw();
    });
  });
  window.addEventListener('resize', draw);

  const finder = document.getElementById('finder');
  const list = document.getElementById('finder-list');
  const renderFinder = () => {
    const q = finder.value.trim().toLowerCase();
    const hits = D.INDICATORS.filter((i) => !q || i.name.toLowerCase().includes(q) || i.value.toLowerCase().includes(q));
    list.innerHTML = hits.map((i) =>
      `<li><a href="${i.route}"><strong>${i.name}</strong><span>${i.value}</span></a></li>`).join('') ||
      '<li class="muted">No indicator matches that search.</li>';
  };
  finder.addEventListener('input', renderFinder);
  renderFinder();
}

// ---------- Population ----------
function viewPopulation() {
  app.innerHTML = `
  <h1>Population</h1>
  <p class="lede">Japan’s population has fallen every year since 2011. Fewer births, longer lives
  and almost no immigration until recently have made it the world’s oldest large society.</p>
  ${kpiCards()}
  <section class="card">
    <h2>Total population, 2015–2024</h2>
    <canvas id="pop-chart"></canvas>
    <div id="pop-table"></div>
    ${sourceNote(D.POPULATION.source + '.')}
  </section>
  <div class="grid2">
    <section class="card">
      <h2>Who lives here, 2024</h2>
      <canvas id="age-chart"></canvas>
      <p class="muted">Almost three in ten people are 65 or older — the highest share of any large country.</p>
      ${sourceNote('Statistics Bureau of Japan, Population Estimates, 1 October 2024.')}
    </section>
    <section class="card">
      <h2>Births and deaths, 2024</h2>
      ${tableHtml(['Measure', 'Number', 'Note'], D.VITALS_2024.map((v) => [v.label, v.value, v.note]))}
      <h3>Total fertility rate</h3>
      <canvas id="tfr-chart"></canvas>
      ${sourceNote(D.FERTILITY.source + '.')}
    </section>
  </div>
  <section class="card">
    <h2>Largest prefectures</h2>
    ${tableHtml(['Prefecture', 'Capital', 'Population', 'Density /km²'],
      D.PREFECTURES.map((p) => [p.name, p.capital, (p.pop / 1000).toFixed(2) + 'm', p.density.toLocaleString('en-US')]))}
    <p><a class="btn" href="#/regions">Explore all regions →</a></p>
  </section>`;
  lineChart(document.getElementById('pop-chart'), D.YEARS, D.POPULATION.values, { format: (v) => v.toFixed(1) + 'm' });
  document.getElementById('pop-table').innerHTML = seriesTable(D.POPULATION, (v) => v.toFixed(1) + ' million');
  hbarChart(document.getElementById('age-chart'),
    D.AGE_2024.map((a) => ({ label: a.group, value: a.share })),
    { format: (v) => v.toFixed(1) + '%', color: '#bc002d' });
  lineChart(document.getElementById('tfr-chart'), D.YEARS, D.FERTILITY.values, { format: (v) => v.toFixed(2), color: '#bc002d' });
}

// ---------- Economy ----------
function viewEconomy() {
  app.innerHTML = `
  <h1>Economy</h1>
  <p class="lede">The world’s fourth-largest economy: about $4 trillion of output, low unemployment,
  and — after decades of near-zero prices — inflation back above 2%.</p>
  <div class="grid2">
    <section class="card">
      <h2>GDP, nominal, 2015–2024</h2>
      <div class="seg" role="group" aria-label="GDP measure">
        <button data-gdp="nom" class="on">Total ($bn)</button>
        <button data-gdp="pc">Per capita ($)</button>
      </div>
      <canvas id="gdp-chart"></canvas>
      <div id="gdp-table"></div>
      ${sourceNote(D.GDP_NOMINAL.source + '. The yen’s fall after 2021 shrinks the dollar figure even as yen GDP grew.')}
    </section>
    <section class="card">
      <h2>Real GDP growth, 2015–2024</h2>
      <canvas id="growth-chart"></canvas>
      <div id="growth-table"></div>
      ${sourceNote(D.GDP_GROWTH.source + '.')}
    </section>
  </div>
  <div class="grid2">
    <section class="card">
      <h2>Unemployment, 2015–2024</h2>
      <canvas id="unemp-chart"></canvas>
      <div id="unemp-table"></div>
      ${sourceNote(D.UNEMPLOYMENT.source + '.')}
    </section>
    <section class="card">
      <h2>Consumer price inflation, 2015–2024</h2>
      <canvas id="cpi-chart"></canvas>
      <div id="cpi-table"></div>
      ${sourceNote(D.CPI.source + '.')}
    </section>
  </div>
  <section class="card">
    <h2>Trade and public finances, 2024</h2>
    ${tableHtml(['Measure', 'Value', 'Note'], D.TRADE_2024.map((t) => [t.label, t.value, t.note]))}
  </section>`;
  let gdpMode = 'nom';
  const drawGdp = () => {
    const s = gdpMode === 'nom' ? D.GDP_NOMINAL : D.GDP_PER_CAPITA;
    const f = gdpMode === 'nom' ? (v) => '$' + v.toLocaleString('en-US') + 'bn' : (v) => '$' + v.toLocaleString('en-US');
    lineChart(document.getElementById('gdp-chart'), D.YEARS, s.values, { format: f });
    document.getElementById('gdp-table').innerHTML = seriesTable(s, f);
  };
  drawGdp();
  document.querySelectorAll('[data-gdp]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-gdp]').forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    gdpMode = b.dataset.gdp;
    drawGdp();
  }));
  barChart(document.getElementById('growth-chart'), D.YEARS, D.GDP_GROWTH.values, { format: (v) => v.toFixed(1) + '%' });
  document.getElementById('growth-table').innerHTML = seriesTable(D.GDP_GROWTH, (v) => v.toFixed(1) + '%');
  lineChart(document.getElementById('unemp-chart'), D.YEARS, D.UNEMPLOYMENT.values, { format: (v) => v.toFixed(1) + '%', min: 2.0, max: 3.6 });
  document.getElementById('unemp-table').innerHTML = seriesTable(D.UNEMPLOYMENT, (v) => v.toFixed(1) + '%');
  barChart(document.getElementById('cpi-chart'), D.YEARS, D.CPI.values, { format: (v) => v.toFixed(1) + '%', color: '#bc002d' });
  document.getElementById('cpi-table').innerHTML = seriesTable(D.CPI, (v) => v.toFixed(1) + '%');
}

// ---------- Health ----------
function viewHealth() {
  app.innerHTML = `
  <h1>Health</h1>
  <p class="lede">Japanese people live longer than anyone else on earth — 84 years on average —
  and the health system reaches everyone through universal insurance.</p>
  <div class="grid2">
    <section class="card">
      <h2>Life expectancy at birth, 2015–2023</h2>
      <canvas id="life-chart"></canvas>
      <div id="life-table"></div>
      ${sourceNote(D.LIFE_EXPECTANCY.source + '.')}
    </section>
    <section class="card">
      <h2>Fertility, 2015–2024</h2>
      <canvas id="fert-chart"></canvas>
      <div id="fert-table"></div>
      ${sourceNote(D.FERTILITY.source + '.')}
    </section>
  </div>
  <section class="card">
    <h2>The health system in numbers</h2>
    ${tableHtml(['Measure', 'Value', 'Note'], D.HEALTH.map((h) => [h.label, h.value, h.note]))}
    <p class="muted">Universal health insurance has covered every resident since 1961; patients typically pay 30% of costs at the point of care, with monthly caps.</p>
  </section>`;
  lineChart(document.getElementById('life-chart'), D.YEARS.slice(0, 9), D.LIFE_EXPECTANCY.values.slice(0, 9), { format: (v) => v.toFixed(1), min: 83.5, max: 85.0 });
  document.getElementById('life-table').innerHTML = seriesTable({ label: 'Life expectancy', unit: 'years', values: D.LIFE_EXPECTANCY.values.slice(0, 9) }, (v) => v.toFixed(1) + ' years');
  lineChart(document.getElementById('fert-chart'), D.YEARS, D.FERTILITY.values, { format: (v) => v.toFixed(2), color: '#bc002d' });
  document.getElementById('fert-table').innerHTML = seriesTable(D.FERTILITY, (v) => v.toFixed(2));
}

// ---------- Education ----------
function viewEducation() {
  app.innerHTML = `
  <h1>Education</h1>
  <p class="lede">Nearly two in three young Japanese adults hold a tertiary degree, and 15-year-olds
  score well above the OECD average in mathematics, reading and science.</p>
  <div class="grid2">
    <section class="card">
      <h2>PISA 2022: Japan vs OECD average</h2>
      <canvas id="pisa-chart"></canvas>
      <p class="muted">Mean scores of 15-year-olds. Japan ranked in the top five of participating economies in all three subjects.</p>
      ${sourceNote('OECD, PISA 2022 Results.')}
    </section>
    <section class="card">
      <h2>Education in numbers</h2>
      ${tableHtml(['Measure', 'Value', 'Note'], D.EDUCATION.map((e) => [e.label, e.value, e.note]))}
    </section>
  </div>
  <section class="card">
    <h2>Environment, for context</h2>
    ${tableHtml(['Measure', 'Value', 'Note'], D.ENVIRONMENT.map((e) => [e.label, e.value, e.note]))}
    <p class="muted">Japan has pledged net-zero greenhouse gas emissions by 2050; emissions have fallen about 17% since 2013.</p>
  </section>`;
  groupedBars(document.getElementById('pisa-chart'),
    D.PISA.map((p) => ({ label: p.subject, a: p.japan, b: p.oecd })),
    { aLabel: 'Japan', bLabel: 'OECD average' });
}

// ---------- Regions ----------
function viewRegions() {
  app.innerHTML = `
  <h1>Regions</h1>
  <p class="lede">Japan has 47 prefectures. A third of the country lives in the greater Tokyo area;
  Hokkaido, the largest prefecture by land, holds barely 4% of the people.</p>
  <section class="card">
    <h2>Ten largest prefectures</h2>
    <canvas id="pref-chart"></canvas>
    ${sourceNote('Statistics Bureau of Japan, Population Estimates, 1 October 2024. Population in millions.')}
  </section>
  <section class="card">
    <h2>Prefecture table</h2>
    <p class="muted">Click a column heading to sort. Type to filter by name or capital.</p>
    <input id="pref-filter" class="finder" type="search" placeholder="Filter prefectures…" aria-label="Filter prefectures">
    <div class="tablewrap"><table id="pref-table">
      <thead><tr>
        <th><button data-sort="name">Prefecture ↕</button></th>
        <th><button data-sort="capital">Capital ↕</button></th>
        <th><button data-sort="pop">Population ↕</button></th>
        <th><button data-sort="density">Density /km² ↕</button></th>
      </tr></thead>
      <tbody id="pref-body"></tbody>
    </table></div>
    <p class="muted" id="pref-count"></p>
    <p><a class="btn" href="data/prefectures.csv" download>Download the table as CSV</a></p>
  </section>`;
  hbarChart(document.getElementById('pref-chart'),
    D.PREFECTURES.map((p) => ({ label: p.name, value: p.pop / 1000 })),
    { format: (v) => v.toFixed(2) + 'm', color: '#bc002d' });
  const body = document.getElementById('pref-body');
  const count = document.getElementById('pref-count');
  const filter = document.getElementById('pref-filter');
  let sortKey = 'pop';
  let sortDir = -1;
  const render = () => {
    const q = filter.value.trim().toLowerCase();
    let rows = D.PREFECTURES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q));
    rows = rows.slice().sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      return (typeof av === 'string' ? av.localeCompare(bv) : av - bv) * sortDir;
    });
    body.innerHTML = rows.map((p) =>
      `<tr><td>${p.name}</td><td>${p.capital}</td><td>${(p.pop / 1000).toFixed(2)}m</td><td>${p.density.toLocaleString('en-US')}</td></tr>`).join('') ||
      '<tr><td colspan="4">No prefecture matches that filter.</td></tr>';
    count.textContent = `Showing ${rows.length} of ${D.PREFECTURES.length} prefectures listed (47 in total; the full list is in the CSV).`;
  };
  filter.addEventListener('input', render);
  document.querySelectorAll('[data-sort]').forEach((b) => b.addEventListener('click', () => {
    if (sortKey === b.dataset.sort) sortDir *= -1;
    else { sortKey = b.dataset.sort; sortDir = sortKey === 'name' || sortKey === 'capital' ? 1 : -1; }
    render();
  }));
  render();
}

// ---------- Compare ----------
function viewCompare() {
  const metrics = D.COMPARE_METRICS;
  app.innerHTML = `
  <h1>Compare countries</h1>
  <p class="lede">How does Japan stack up? Pick an indicator to chart seven large economies side by side,
  or put Japan head-to-head with one other country.</p>
  <section class="card">
    <div class="card-head"><h2 id="cmp-title">Population</h2>
      <div class="seg" role="group" aria-label="Choose indicator">
        ${metrics.map((m, i) => `<button data-cmp="${m.key}" class="${i === 0 ? 'on' : ''}">${m.label}</button>`).join('')}
      </div>
    </div>
    <canvas id="cmp-chart"></canvas>
    <div id="cmp-table"></div>
    <p class="src" id="cmp-source">Sources: IMF WEO October 2025; UN World Population Prospects 2024; ILO modelled estimates.</p>
  </section>
  <section class="card">
    <h2>Head to head with Japan</h2>
    <label class="pick">Compare Japan with
      <select id="rival">
        ${D.COMPARE.filter((c) => c.country !== 'Japan').map((c) => `<option>${c.country}</option>`).join('')}
      </select>
    </label>
    <div id="rival-table"></div>
  </section>`;
  let current = metrics[0];
  const draw = () => {
    document.getElementById('cmp-title').textContent = current.label + ' (' + current.unit + ')';
    hbarChart(document.getElementById('cmp-chart'),
      D.COMPARE.map((c) => ({ label: c.country, value: c[current.key] })),
      { format: current.format, color: '#12395b' });
    document.getElementById('cmp-table').innerHTML = tableHtml(
      ['Country', current.label + ' (' + current.unit + ')'],
      D.COMPARE.map((c) => [c.country === 'Japan' ? '<strong>Japan</strong>' : c.country, current.format(c[current.key])]));
  };
  draw();
  document.querySelectorAll('[data-cmp]').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('[data-cmp]').forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    current = metrics.find((m) => m.key === b.dataset.cmp);
    draw();
  }));
  const rival = document.getElementById('rival');
  const drawRival = () => {
    const other = D.COMPARE.find((c) => c.country === rival.value);
    const jp = D.COMPARE[0];
    document.getElementById('rival-table').innerHTML = tableHtml(
      ['Indicator', 'Japan', rival.value],
      metrics.map((m) => [m.label + ' (' + m.unit + ')', m.format(jp[m.key]), m.format(other[m.key])]));
  };
  rival.addEventListener('change', drawRival);
  drawRival();
}

// ---------- Sources ----------
function viewSources() {
  app.innerHTML = `
  <h1>Sources &amp; methods</h1>
  <p class="lede">Every number on this site comes from an official source. Figures are rounded for
  display; download the underlying tables to check them yourself.</p>
  <section class="card">
    <h2>Download the data</h2>
    <p><a class="btn" href="data/population.csv" download>population.csv</a>
    <a class="btn" href="data/economy.csv" download>economy.csv</a>
    <a class="btn" href="data/prefectures.csv" download>prefectures.csv</a></p>
    <p class="muted">CSV files, UTF-8, one row per year or prefecture. Values match the tables on this site.</p>
  </section>
  <section class="card">
    <h2>Where every dataset comes from</h2>
    ${tableHtml(['Dataset', 'Source', 'Year', 'Detail'],
      D.SOURCES.map((s) => [s.dataset, s.source, s.year, s.detail]))}
  </section>
  <section class="card">
    <h2>Methods and notes</h2>
    <ul class="notes">
      <li>Population figures are mid-year estimates (World Bank) unless marked 1 October (Statistics Bureau of Japan).</li>
      <li>GDP in US dollars moves with the yen: the 2022–2024 fall in dollar GDP is mostly the exchange rate, not a shrinking economy in yen terms.</li>
      <li>2024 births, deaths and fertility are preliminary totals from the monthly Vital Statistics report; the final annual report may revise them slightly.</li>
      <li>The 2024 life-expectancy value repeats 2023 because the 2024 complete life table had not been released when this site was built.</li>
      <li>Country-comparison unemployment rates for China and India are ILO modelled estimates, not the national headline rates.</li>
      <li>This is an independent showcase, not an official government publication. Figures were compiled in November 2026.</li>
    </ul>
    <h2>Find an indicator</h2>
    <input id="finder2" class="finder" type="search" placeholder="Search all indicators…" aria-label="Search all indicators">
    <ul id="finder2-list" class="finder-list"></ul>
  </section>`;
  const finder = document.getElementById('finder2');
  const list = document.getElementById('finder2-list');
  const render = () => {
    const q = finder.value.trim().toLowerCase();
    const hits = D.INDICATORS.filter((i) => !q || i.name.toLowerCase().includes(q) || i.value.toLowerCase().includes(q));
    list.innerHTML = hits.map((i) =>
      `<li><a href="${i.route}"><strong>${i.name}</strong><span>${i.value}</span></a></li>`).join('') ||
      '<li class="muted">No indicator matches that search.</li>';
  };
  finder.addEventListener('input', render);
  render();
}

const ROUTES = {
  '#/': viewHome,
  '#/population': viewPopulation,
  '#/economy': viewEconomy,
  '#/health': viewHealth,
  '#/education': viewEducation,
  '#/regions': viewRegions,
  '#/compare': viewCompare,
  '#/sources': viewSources,
};

function render() {
  const hash = location.hash || '#/';
  const view = ROUTES[hash] || ROUTES['#/'];
  document.getElementById('nav').innerHTML = navHtml(ROUTES[hash] ? hash : '#/');
  view();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);

// Header search: jump to any indicator.
function renderSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) { searchResults.innerHTML = ''; searchResults.hidden = true; return; }
  const hits = D.INDICATORS.filter((i) => i.name.toLowerCase().includes(q) || i.value.toLowerCase().includes(q)).slice(0, 6);
  searchResults.innerHTML = hits.map((i) =>
    `<li><a href="${i.route}"><strong>${i.name}</strong><span>${i.value}</span></a></li>`).join('') ||
    '<li class="muted">No indicator matches.</li>';
  searchResults.hidden = false;
}
searchInput.addEventListener('input', renderSearch);
searchInput.addEventListener('focus', renderSearch);
searchResults.addEventListener('click', () => { searchResults.hidden = true; searchInput.value = ''; });
document.addEventListener('click', (e) => {
  if (!e.target.closest('.searchbox')) { searchResults.hidden = true; }
});

render();

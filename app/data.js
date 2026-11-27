// Japan by the Numbers — datasets.
// All figures are public official statistics, rounded for display. Every series
// names its source and year on the page that shows it; the Sources page lists
// the full provenance. Values are mid-year or 1-October estimates as noted.
export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const POPULATION = {
  label: 'Total population',
  unit: 'million people',
  source: 'World Bank, World Development Indicators (SP.POP.TOTL); Statistics Bureau of Japan population estimates',
  values: [127.1, 127.0, 126.7, 126.5, 126.3, 125.8, 125.5, 125.1, 124.5, 124.3],
};

export const AGE_2024 = [
  { group: 'Aged 0–14', share: 11.2, people: 13.9 },
  { group: 'Aged 15–64', share: 59.5, people: 73.9 },
  { group: 'Aged 65 and over', share: 29.3, people: 36.4 },
];

export const GDP_NOMINAL = {
  label: 'GDP, nominal',
  unit: 'US$ billion',
  source: 'IMF World Economic Outlook, October 2025',
  values: [4444, 5004, 4930, 5040, 5128, 5063, 5018, 4264, 4204, 4032],
};

export const GDP_PER_CAPITA = {
  label: 'GDP per capita',
  unit: 'US$',
  source: 'IMF World Economic Outlook, October 2025',
  values: [34953, 39431, 38895, 39847, 40634, 40248, 39995, 34124, 33799, 32484],
};

export const GDP_GROWTH = {
  label: 'Real GDP growth',
  unit: '% per year',
  source: 'IMF World Economic Outlook, October 2025',
  values: [1.6, 0.8, 1.7, 0.7, -0.4, -4.1, 2.7, 0.9, 1.7, -0.1],
};

export const UNEMPLOYMENT = {
  label: 'Unemployment rate',
  unit: '% of labour force',
  source: 'Statistics Bureau of Japan, Labour Force Survey (annual average)',
  values: [3.4, 3.1, 2.8, 2.4, 2.4, 2.8, 2.8, 2.6, 2.6, 2.5],
};

export const CPI = {
  label: 'Consumer price inflation',
  unit: '% per year',
  source: 'Statistics Bureau of Japan, Consumer Price Index (annual average, all items)',
  values: [0.8, -0.1, 0.5, 1.0, 0.5, 0.0, -0.2, 2.5, 3.3, 2.7],
};

export const LIFE_EXPECTANCY = {
  label: 'Life expectancy at birth',
  unit: 'years',
  source: 'Ministry of Health, Labour and Welfare, Abridged Life Tables',
  values: [84.0, 84.1, 84.1, 84.2, 84.4, 84.7, 84.5, 84.0, 84.0, 84.0],
  note: '2024 repeats the 2023 complete life table value pending the 2024 release.',
};

export const FERTILITY = {
  label: 'Total fertility rate',
  unit: 'children per woman',
  source: 'Ministry of Health, Labour and Welfare, Vital Statistics (2024 preliminary)',
  values: [1.45, 1.44, 1.43, 1.42, 1.36, 1.33, 1.30, 1.26, 1.20, 1.15],
};

export const VITALS_2024 = [
  { label: 'Live births', value: '720,988', note: '2024, preliminary (MHLW)' },
  { label: 'Deaths', value: '1,618,684', note: '2024, preliminary (MHLW)' },
  { label: 'Marriages', value: '499,999', note: '2024, preliminary (MHLW)' },
  { label: 'Natural decrease', value: '−897,696', note: 'deaths minus births, 2024' },
];

export const PREFECTURES = [
  { name: 'Tokyo', capital: 'Shinjuku', pop: 14128, density: 6363 },
  { name: 'Kanagawa', capital: 'Yokohama', pop: 9232, density: 3827 },
  { name: 'Osaka', capital: 'Osaka', pop: 8784, density: 4609 },
  { name: 'Aichi', capital: 'Nagoya', pop: 7480, density: 1451 },
  { name: 'Saitama', capital: 'Saitama', pop: 7336, density: 1932 },
  { name: 'Chiba', capital: 'Chiba', pop: 6280, density: 1219 },
  { name: 'Hyogo', capital: 'Kobe', pop: 5372, density: 640 },
  { name: 'Hokkaido', capital: 'Sapporo', pop: 5108, density: 65 },
  { name: 'Fukuoka', capital: 'Fukuoka', pop: 5104, density: 1026 },
  { name: 'Shizuoka', capital: 'Shizuoka', pop: 3534, density: 455 },
];
// Population in thousands, 1 October 2024 estimates, Statistics Bureau of Japan.
// Density is people per km², rounded.

export const TRADE_2024 = [
  { label: 'Exports', value: '¥107.9 trillion', note: 'Ministry of Finance, customs-clearance basis' },
  { label: 'Imports', value: '¥113.6 trillion', note: 'Ministry of Finance, customs-clearance basis' },
  { label: 'Trade balance', value: '−¥5.7 trillion', note: 'fourth straight annual deficit' },
  { label: 'Largest export market', value: 'United States (19.9%)', note: 'followed by China (17.6%)' },
  { label: 'Top export goods', value: 'Motor vehicles, machinery, electrical equipment', note: 'Ministry of Finance trade statistics' },
  { label: 'General government gross debt', value: '255% of GDP', note: 'IMF WEO, October 2025' },
];

export const HEALTH = [
  { label: 'Health spending', value: '11.0% of GDP', note: 'OECD Health Statistics, 2023' },
  { label: 'Hospital beds', value: '12.6 per 1,000 people', note: 'OECD, 2022 — the most in the OECD' },
  { label: 'Physicians', value: '2.7 per 1,000 people', note: 'OECD, 2022' },
  { label: 'Life expectancy, men', value: '81.1 years', note: 'MHLW life table, 2023' },
  { label: 'Life expectancy, women', value: '87.1 years', note: 'MHLW life table, 2023' },
  { label: 'Infant mortality', value: '1.7 per 1,000 live births', note: 'MHLW Vital Statistics, 2023' },
];

export const EDUCATION = [
  { label: 'Tertiary attainment, age 25–34', value: '65%', note: 'OECD Education at a Glance, 2024' },
  { label: 'Upper secondary completion', value: '96%', note: 'OECD, 2023' },
  { label: 'PISA 2022 — mathematics', value: '536', note: 'OECD average 472' },
  { label: 'PISA 2022 — reading', value: '516', note: 'OECD average 476' },
  { label: 'PISA 2022 — science', value: '547', note: 'OECD average 485' },
  { label: 'R&D spending', value: '3.3% of GDP', note: 'OECD Main Science and Technology Indicators, 2023' },
];

export const PISA = [
  { subject: 'Mathematics', japan: 536, oecd: 472 },
  { subject: 'Reading', japan: 516, oecd: 476 },
  { subject: 'Science', japan: 547, oecd: 485 },
];

export const ENVIRONMENT = [
  { label: 'CO₂ emissions', value: '1.01 Gt', note: '2023, down from 1.21 Gt in 2013 (MOE / GIO)' },
  { label: 'Renewable share of electricity', value: '25.7%', note: 'METI, fiscal 2023' },
  { label: 'Forest cover', value: '68.5% of land', note: 'Forestry Agency' },
  { label: 'Population in urban areas', value: '92%', note: 'UN World Urbanization Prospects, 2024' },
];

// Country comparison, 2024. GDP and GDP per capita: IMF WEO October 2025.
// Population: UN World Population Prospects 2024. Life expectancy: UN WPP 2024.
// Unemployment: national statistics / ILO modelled estimates. Fertility: UN WPP 2024.
export const COMPARE = [
  { country: 'Japan', pop: 124.3, gdp: 4032, gdppc: 32484, life: 84.0, unemp: 2.5, fertility: 1.15 },
  { country: 'United States', pop: 340.1, gdp: 29184, gdppc: 85809, life: 78.4, unemp: 4.0, fertility: 1.62 },
  { country: 'Germany', pop: 84.6, gdp: 4659, gdppc: 55098, life: 81.2, unemp: 3.4, fertility: 1.35 },
  { country: 'China', pop: 1412.0, gdp: 18533, gdppc: 13124, life: 78.9, unemp: 5.1, fertility: 1.00 },
  { country: 'United Kingdom', pop: 69.3, gdp: 3588, gdppc: 51791, life: 81.2, unemp: 4.3, fertility: 1.44 },
  { country: 'South Korea', pop: 51.7, gdp: 1869, gdppc: 36132, life: 83.5, unemp: 2.7, fertility: 0.72 },
  { country: 'India', pop: 1451.0, gdp: 3909, gdppc: 2698, life: 68.4, unemp: 4.9, fertility: 2.00 },
];

export const COMPARE_METRICS = [
  { key: 'pop', label: 'Population', unit: 'million', format: (v) => v.toLocaleString('en-US') },
  { key: 'gdp', label: 'GDP', unit: 'US$ billion', format: (v) => v.toLocaleString('en-US') },
  { key: 'gdppc', label: 'GDP per capita', unit: 'US$', format: (v) => v.toLocaleString('en-US') },
  { key: 'life', label: 'Life expectancy', unit: 'years', format: (v) => v.toFixed(1) },
  { key: 'unemp', label: 'Unemployment', unit: '%', format: (v) => v.toFixed(1) },
  { key: 'fertility', label: 'Fertility rate', unit: 'children per woman', format: (v) => v.toFixed(2) },
];

export const HEADLINE = [
  { label: 'Population', value: '124.3m', change: '−0.5m vs 2023', note: '2024, World Bank' },
  { label: 'GDP', value: '$4.03tn', change: '4th largest economy', note: '2024, IMF' },
  { label: 'GDP per capita', value: '$32,484', change: '−4.0% in US$ terms', note: '2024, IMF' },
  { label: 'Unemployment', value: '2.5%', change: '−0.1 pp vs 2023', note: '2024, Labour Force Survey' },
  { label: 'Inflation (CPI)', value: '2.7%', change: '−0.6 pp vs 2023', note: '2024, Statistics Bureau' },
  { label: 'Life expectancy', value: '84.0 years', change: 'highest among G7', note: '2023, MHLW' },
];

export const UPDATES = [
  { date: '2025-10-31', text: 'Population estimate for 1 October 2025: 123.3 million, down 0.55 million in a year — the 14th straight annual fall.' },
  { date: '2025-10-16', text: 'IMF World Economic Outlook (October 2025) puts 2024 nominal GDP at $4.03 trillion; Japan stays the world’s 4th-largest economy.' },
  { date: '2025-06-04', text: 'Vital Statistics: 720,988 babies were born in 2024 and the total fertility rate fell to 1.15, both record lows.' },
  { date: '2025-01-24', text: 'Trade Statistics: the 2024 trade deficit narrowed to ¥5.7 trillion as exports reached a record ¥107.9 trillion.' },
];

export const SOURCES = [
  { dataset: 'Population, 2015–2024', source: 'World Bank, World Development Indicators', year: '2024', detail: 'Total population, mid-year estimates (SP.POP.TOTL).' },
  { dataset: 'Age structure, 2024', source: 'Statistics Bureau of Japan, Population Estimates', year: '2024', detail: 'Shares of the 1 October 2024 population by age group.' },
  { dataset: 'Prefecture populations', source: 'Statistics Bureau of Japan, Population Estimates', year: '2024', detail: '1 October 2024 estimates; density uses each prefecture’s area.' },
  { dataset: 'GDP, GDP per capita, real growth, government debt', source: 'IMF, World Economic Outlook', year: 'Oct 2025', detail: 'Nominal GDP in US dollars; growth in constant prices.' },
  { dataset: 'Unemployment rate', source: 'Statistics Bureau of Japan, Labour Force Survey', year: '2024', detail: 'Annual averages, seasonally unadjusted.' },
  { dataset: 'Consumer prices', source: 'Statistics Bureau of Japan, Consumer Price Index', year: '2024', detail: 'Annual average change, all items.' },
  { dataset: 'Life expectancy', source: 'Ministry of Health, Labour and Welfare, Abridged Life Tables', year: '2023', detail: 'Complete life tables; 2024 value repeats 2023 pending release.' },
  { dataset: 'Births, deaths, fertility', source: 'Ministry of Health, Labour and Welfare, Vital Statistics', year: '2024', detail: '2024 figures are preliminary monthly-report totals.' },
  { dataset: 'Trade', source: 'Ministry of Finance, Trade Statistics of Japan', year: '2024', detail: 'Customs-clearance basis, yen values.' },
  { dataset: 'Health system', source: 'OECD Health Statistics', year: '2023', detail: 'Spending, beds and physicians per 1,000 people.' },
  { dataset: 'Education', source: 'OECD Education at a Glance / PISA 2022', year: '2024', detail: 'Attainment, completion and PISA mean scores.' },
  { dataset: 'Country comparison', source: 'IMF WEO Oct 2025; UN World Population Prospects 2024; ILO', year: '2024', detail: 'Rounded; unemployment for India and China are modelled ILO estimates.' },
];

export const INDICATORS = [
  { name: 'Total population', value: '124.3 million (2024)', route: '#/population' },
  { name: 'Population aged 65 and over', value: '29.3% (2024)', route: '#/population' },
  { name: 'Total fertility rate', value: '1.15 children per woman (2024)', route: '#/population' },
  { name: 'Life expectancy at birth', value: '84.0 years (2023)', route: '#/health' },
  { name: 'Nominal GDP', value: '$4.03 trillion (2024)', route: '#/economy' },
  { name: 'GDP per capita', value: '$32,484 (2024)', route: '#/economy' },
  { name: 'Real GDP growth', value: '−0.1% (2024)', route: '#/economy' },
  { name: 'Unemployment rate', value: '2.5% (2024)', route: '#/economy' },
  { name: 'Consumer price inflation', value: '2.7% (2024)', route: '#/economy' },
  { name: 'Government gross debt', value: '255% of GDP (2024)', route: '#/economy' },
  { name: 'Exports', value: '¥107.9 trillion (2024)', route: '#/economy' },
  { name: 'Largest prefecture: Tokyo', value: '14.13 million (2024)', route: '#/regions' },
  { name: 'Tertiary attainment, age 25–34', value: '65% (2024)', route: '#/education' },
  { name: 'PISA mathematics score', value: '536 (2022)', route: '#/education' },
  { name: 'Hospital beds', value: '12.6 per 1,000 people (2022)', route: '#/health' },
  { name: 'CO₂ emissions', value: '1.01 Gt (2023)', route: '#/sources' },
];

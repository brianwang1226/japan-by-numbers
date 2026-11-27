[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/brianwang1226/japan-by-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/brianwang1226/japan-by-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Japan by the Numbers

A national statistics site for Japan — population, economy, health, education and
regions — built for the [make.fun competition](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

Every figure is a real public statistic with its source named on the page:
population 124.3 million (2024), GDP $4.03 trillion (IMF), unemployment 2.5%,
life expectancy 84.0 years, and more, over 2015–2024.

## What it does

- **Overview** — headline indicators, a switchable ten-year chart (population / GDP /
  unemployment / inflation), largest prefectures, latest updates, and an indicator finder.
- **Population** — ten-year trend, age structure, births and deaths, fertility.
- **Economy** — GDP (total and per capita), real growth, unemployment, inflation, trade.
- **Health** — life expectancy, fertility, the health system in numbers.
- **Education** — PISA 2022 vs the OECD average, attainment, R&D.
- **Regions** — the ten largest prefectures charted, plus a sortable, filterable table.
- **Compare** — Japan against the US, Germany, China, the UK, South Korea and India,
  on six indicators, plus a head-to-head picker.
- **Sources** — where every dataset comes from, with the tables downloadable as CSV.

The site is plain static files under `app/` — no network requests, no build step.
Charts are drawn on canvas from the data in `app/data.js`, and every chart is
followed by a table with the same numbers.

## Run it

```sh
node serve.ts   # serves app/ at http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).

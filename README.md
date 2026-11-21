# Rainy-Season Rainfall Anomalies in Northern Nigeria

An Earth Engine + Power BI project that compares rainy-season (June to
September) rainfall in six northern Nigerian states with the 1991-2020
long-term average. The workflow mirrors the kind of climate-context
analysis used alongside humanitarian needs assessments.

![Dashboard](images/dashboard.png)

## Question

How did rainfall in the 2024 rainy season compare with the long-term
average in Borno, Yobe, Adamawa, Zamfara, Katsina and Sokoto, and how
has seasonal rainfall varied since 1991?

## Data

| Source | Use |
|---|---|
| CHIRPS Daily (`UCSB-CHG/CHIRPS/DAILY`), Climate Hazards Center, UCSB | Daily rainfall estimates (mm/day), about 5.5 km resolution, public domain |
| FAO GAUL 2015 level 1 (`FAO/GAUL/2015/level1`) | State boundaries |

## Method

1. **Google Earth Engine** (`gee/rainfall_by_state.js`): sum daily rainfall
   from 1 June to 30 September for each year from 1991 to 2024, then
   average the result over each state. Export one row per state and year
   (204 rows) to `data/northern_nigeria_rainy_season_rainfall.csv`.
2. **Power BI** (`powerbi/rainfall_anomaly_dashboard.pbix`):
   - Baseline = average seasonal rainfall for each state, 1991-2020.
   - Anomaly % = (selected-year rainfall - baseline) / baseline.
   - Visuals: anomaly by state, rainfall trend by year, and a summary table.

## Key findings

> Replace the bracketed text with your real numbers after building the dashboard.

- In 2024, [state] had the largest rainfall anomaly ([+/- X]% against its
  1991-2020 average), and [state] had the [smallest / most negative]
  ([+/- X]%).
- [One sentence about the long-term trend or year-to-year variability.]

## Limitations

- Rainfall alone does not measure flooding, crop loss or humanitarian
  impact. An anomaly shows where conditions were unusual, not what the
  consequences were.
- CHIRPS is a satellite-and-station estimate. Accuracy varies, especially
  where few ground stations exist.
- State averages hide local variation inside large states.
- Only the June to September season is analysed.

## Repository structure

```
gee/       Earth Engine script
data/      Exported CSV
powerbi/   Power BI report file
images/    Dashboard screenshot and study-area map
```

## How to reproduce

1. Open the [Earth Engine Code Editor](https://code.earthengine.google.com)
   and paste in `gee/rainfall_by_state.js`.
2. Run it, then start the export task in the Tasks tab and download the CSV
   from Google Drive.
3. Open `powerbi/rainfall_anomaly_dashboard.pbix` in Power BI Desktop and
   refresh the data source to point at your CSV.

## Tools

Google Earth Engine (JavaScript API), Power BI (DAX), CHIRPS, FAO GAUL

## Author

George Anya, Abuja, Nigeria
[LinkedIn](https://www.linkedin.com/in/georgeulah)

## Data citation

Funk, C. et al. (2015). The climate hazards infrared precipitation with
stations - a new environmental record for monitoring extremes.
*Scientific Data* 2, 150066. doi:10.1038/sdata.2015.66

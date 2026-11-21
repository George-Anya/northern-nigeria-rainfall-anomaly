// ====================================================================
// Rainy-season rainfall by state, northern Nigeria (1991-2024)
// Author:  George Anya
// Data:    CHIRPS daily rainfall (UCSB-CHG/CHIRPS/DAILY)
//          FAO GAUL 2015 first-level administrative boundaries
// Output:  CSV with one row per state and year (total rainfall in mm,
//          1 June to 30 September), exported to Google Drive.
// Run in the Earth Engine Code Editor: code.earthengine.google.com
// ====================================================================

// --- 1. Study area: six states ------------------------------------
var stateNames = ['Borno', 'Yobe', 'Adamawa', 'Zamfara', 'Katsina', 'Sokoto'];

var states = ee.FeatureCollection('FAO/GAUL/2015/level1')
  .filter(ee.Filter.eq('ADM0_NAME', 'Nigeria'))
  .filter(ee.Filter.inList('ADM1_NAME', stateNames));

Map.centerObject(states, 6);
Map.addLayer(states, {color: 'blue'}, 'Study states');
print('States found (expect 6):', states.size());

// --- 2. Rainfall data ----------------------------------------------
var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY');

// --- 3. Seasonal total for each year -------------------------------
// Adds up daily rainfall (mm/day) from 1 June to 30 September.
var years = ee.List.sequence(1991, 2024);

var seasonal = ee.ImageCollection(years.map(function (y) {
  y = ee.Number(y);
  var start = ee.Date.fromYMD(y, 6, 1);
  var end = ee.Date.fromYMD(y, 10, 1);   // end date is exclusive
  return chirps
    .filterDate(start, end)
    .select('precipitation')
    .sum()
    .set('year', y);
}));

// --- 4. Average inside each state ----------------------------------
// scale = 5566 m matches the CHIRPS pixel size (about 0.05 degrees).
var table = seasonal.map(function (img) {
  var stats = img.reduceRegions({
    collection: states,
    reducer: ee.Reducer.mean(),
    scale: 5566
  });
  return stats.map(function (f) {
    return ee.Feature(null, {
      state: f.get('ADM1_NAME'),
      year: img.get('year'),
      rain_mm: f.get('mean')
    });
  });
}).flatten();

print('Rows (expect 204 = 6 states x 34 years):', table.size());
print('First rows:', table.limit(6));

// --- 5. Export to Google Drive -------------------------------------
Export.table.toDrive({
  collection: table,
  description: 'northern_nigeria_rainy_season_rainfall',
  fileFormat: 'CSV',
  selectors: ['state', 'year', 'rain_mm']
});

# Data Sources

## 1. Station Regions

"Stations" are local aggregations of TfL/Santander public bicycle hire docking stations _powered by TfL Open Data, containing OS data © Crown copyright and database rights 2020' and Geomni UK Map data © and database rights 2020._

Original docking station locations before aggregation available from [TFL BikePoint API](https://api.tfl.gov.uk/swagger/ui/index.html?url=/swagger/docs/v1#!/BikePoint/BikePoint_GetAll).

## 2. Bicycle Activity

Bicycle activity derived by calculating the change in docked bicycles every 10 minutes. Each region's daily activity is the sum of absolute changes in docked bikes over a 24 hour (midnight to midnight) period for each docking station within the region. See [data processing of TfL docking stations](https://jwolondon.github.io/mobv/docs/london/dataProcessing) for more details.

## 3. Map Data

Map data (River Thames and Parks) derived from [Open Street Map](https://www.openstreetmap.org/copyright).

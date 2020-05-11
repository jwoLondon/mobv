# Movement during the Corona Pandemic

How can we understand and compare patterns of human movement? Are individuals moving more or less than normal at the moment? And where are people moving? The following linked visualizations - heatmaps, charts and maps - are designed to help decision makers and other interested parties gain an overview and allow simple comparisons between locations in Zurich over time.

## Visualisations

The visualisations were conceived to work with different forms of mobility. In Zurich, we illustrate their use through bike counting and pedestrian stations. Rather than absolute counts, we show the difference to a reference value calculated for each counting station. The reference value is the median count for the period between the 3rd of January and the 6th of February 2020, and is calculated for individual days separately. In the heatmap, blue boxes indicate days with less bike traffic with respect to the mean, orange more. The bike stations are sorted: stations with the highest counts are shown first.

The heatmaps are dynamic to enable comparison between stations: through mouseover the values for an individual day, the reference value (median) and the anomaly (the so-called Chi value) are shown. With a mouse click on a cell a single station can be selected and is highlighted in all three visualisations. Shift-click allows selection of multiple stations, and double-click reselects all stations.

The vertical patterns in the heatmap and charts show how overall relative mobility in Zurich rapidly reduced after the lockdown in mid-March, though not all locations behave in the same way. Other patterns are visible - for example bicycle use rapidly increases, especially on weekends, and mobility as a whole is strongly influenced by weather as shown by the rainy weather starting on the 28th of April.

## Data sources and implementation

We wouldn't have been able to implement our visualisations without the [Open Government Data of the City of Zurich](https://data.stadt-zuerich.ch/dataset/ted_taz_verkehrszaehlungen_werte_fussgaenger_velo). Thanks also to the [Department of Civil Engineering](https://www.stadt-zuerich.ch/ted/de/index/taz.html) for collecting the data and making them available as open data together with the [Open Data Zurich Team](https://www.stadt-zuerich.ch/portal/de/index/ogd.html) at the [Statistics Office of the City of Zurich](https://www.stadt-zuerich.ch/prd/de/index/statistik.html) as well as [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) for the mapping data.

We have created similar visualisations for the cities of [Basel](https://jwolondon.github.io/mobv/docs/basel/) and [New York](https://jwolondon.github.io/mobv/docs/newyork) in Switzerland. All of the code for our analysis of Basel, Zurich and New York is available [under an open licence](https://github.com/jwoLondon/mobv/blob/master/LICENSE) for further applications.



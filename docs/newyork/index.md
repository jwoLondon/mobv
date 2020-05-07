<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Movement during the Corona Pandemic

How can we understand and compare patterns of human movement? Are individuals moving more or less than normal at the moment? And where are people moving? The following linked visualizations - heatmaps, charts and maps - are designed to help interested parties gain an overview and allow simple comparisons between locations in New York over time.

## Idea

The visualisations were conceived to work with different forms of mobility. In New York, we illustrate their use of bike counting stations. Rather than absolute counts, we show the difference to a reference value calculated for each counting station. The reference is the daily median count for the period between the 3rd of January and the 6th of February 2020, and is calculated for individual days separately. In the heatmap, blue boxes indicate days with less bike traffic with respect to the mean, orange more. The bike stations are sorted: stations with the highest counts are shown first.

## Visualizations

The heatmaps are dynamic to enable comparison between stations: through mouseover the values for an individual day, the reference value (median) and the anomaly (the so-called Chi value) are shown. With a mouse click on a cell a single station can be selected and is highlighted in all three visualisations. Shift-click allows selection of multiple stations, and double-click reselects all stations.

The vertical patterns in the heatmap and the charts show clearly how mobility in New York after the lockdown changed, but also that not all stations behave in the same ways. Other patterns, for example weekend movement are clearly visible.

<div class="wide" id="visLinkedBicycle"></div>

## Data sources and implementation

We wouldn't have been able to implement these visualisations without the [Open Data of the City of New York](https://opendata.cityofnewyork.us/). Many thanks to them, and to [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) for the mapping data.

We have created similar visualisations for the cities of [Zurich](https://jwolondon.github.io/mobv/docs/zurich/) and [Basel](https://jwolondon.github.io/mobv/docs/basel) in Switzerland. All of the code for our analysis of Basel, Zurich and New York is available [under an open licence](https://github.com/jwoLondon/mobv/blob/master/LICENSE) for further applications.

## Team

Conceived and implemented by

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City University London](https://www.gicentre.net/jwo)_

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/newYorkVisSpecs.js"></script>

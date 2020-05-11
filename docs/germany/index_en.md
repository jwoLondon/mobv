<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Movement during the Corona Pandemic

How can we understand and compare patterns of human movement? Are individuals moving more or less than normal at the moment? And where are people moving? The following linked visualizations - heatmaps, charts and maps - are designed to help decision makers and other interested parties gain an overview and allow simple comparisons between locations across Germany over time.

## Visualisations

The visualisations were conceived to work with different forms of mobility. In Germany, we illustrate their use through pedestrian counters provided by [HyStreet](https://hystreet.com) across the country. Rather than absolute counts, we show the difference to a reference value calculated for each counting station. The reference value is the median count for the period between the 3rd of January and the 6th of February 2020, and is calculated for individual days separately. In the heatmap, blue boxes indicate days with less bike traffic with respect to the mean, orange more. The bike stations are sorted: stations with the highest counts are shown first.

The heatmaps are dynamic to enable comparison between stations: through mouseover the values for an individual day, the reference value (median) and the anomaly (the so-called Chi value) are shown. With a mouse click on a cell a single station can be selected and is highlighted in all three visualisations. Shift-click allows selection of multiple stations, and double-click reselects all stations. You can also select stations through a click on the map.

The vertical patterns in the heatmap and charts show how overall relative mobility in Germany rapidly reduced after the lockdown in mid-March, though not all locations behave in the same way. As Germany emerges at different rates from the lockdown, comparisons will allow exploration of behaviour over time.

## Data sources and implementation
We wouldn't have been able to create these visualisations without the API provided by [HyStreet](https://hystreet.com) and an excellent R-wrapper for the API allowing us to quickly query these data [hystReet](https://cran.r-project.org/package=hystReet). Many thanks!

We have created similar visualisations for the cities of [Zurich]((https://jwolondon.github.io/mobv/docs/zurich/)), [Basel](https://jwolondon.github.io/mobv/docs/basel/), [London](https://jwolondon.github.io/mobv/docs/london/) and [New York](https://jwolondon.github.io/mobv/docs/newyork) in Switzerland. All of our code is available [under an open licence](https://github.com/jwoLondon/mobv/blob/master/LICENSE) for further applications.

## Team
Conceived and implemented by

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City University London](https://www.gicentre.net/jwo)_

# Pedestrian counts

<div class="wide" id="visLinkedFoot"></div>

<script src="js/germanyVisSpecs.js"></script>

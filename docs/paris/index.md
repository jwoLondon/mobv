<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

<style>
input[type="range"],
  .vega-bind {
    font-size:0px;
}
</style>

# Public Bicycle Use in Paris

How can we understand and compare patterns of human movement? Are individuals moving more or less than normal at the moment? And where in Paris are people moving?

We estimate one form of active travel – use of the [Vélib'](https://www.velib-metropole.fr/) – by looking at how numbers of bicycles at docking stations change. By combining measures of docking station activity with [quarters of Paris](https://en.wikipedia.org/wiki/Quarters_of_Paris) we can estimate where and when travel by hire bicycle occurs.

By comparing daily use with that expected between January 6th and March 1st 2020 ("anomaly" calculated with the [signed chi score](https://openaccess.city.ac.uk/id/eprint/537/1/wood_visualization_2010.pdf)), we can begin to see the effect of the Covid-19 crisis on movement patterns – where and when we see more or less bicycle activity than expected. Expected use is calculated by day of week for each local region so we can account for expected weekday/weekend fluctuations.

<!--## London-Wide Patterns

How has the total volume of cycle hire use changed through 2020 and how does it compare with last year? Because there is a strong weekday-weekend pattern, data from 2019 are shifted by a day so the days of the week align between both years. The weekly rolling average (thick lines) shows the general trend avoiding the large differences between weekday and weekend behaviour.

<div class="wide" id="visTotal"></div>

What about during the day? How do daily patterns vary between 2019 and 2020? Below we compare January-July 2019 with the time since the London lockdown. Darker squares represent a greater volume of cycle hire use within an hour long period.

_1st January – 31st July 2019:_

<div class="wide" id="visHourly2019"></div>

_Monthly patterns in 2020:_

<div class="wide" id="visHourly2020"></div>
-->
## Variation by Locality

We can compare movement in local regions: through mouseover the values for an individual day, the expected value and the anomaly are shown. With a mouse click on a cell, a single locality can be selected and is highlighted in all three visualisations. Shift-click allows selection of multiple localities, and double-click selects all of Paris.

Stations are sorted vertically by the overall volume of activity with busier areas towards the top.

<div class="wide" id="visLinkedBicycle"></div>

The vertical patterns in the charts show clearly how mobility in Paris before, during and after the lockdown changed and that weekday and weekend changes differ. We also see the effect of public holidays (especially Easter) on, what is in many cases, discretionary travel. 

<!--### Geographic patterns

_Drag slider to see change over time._

<div class="wide" id="visMap"></div>-->

## Team

Conceived and implemented by

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City, University of London](https://www.gicentre.net/jwo)_

Data preparation by
- _[Stefan Ivanovic](https://twitter.com/jwolondon) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/)_

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/parisVisSpecs.js"></script>

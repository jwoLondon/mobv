# Urban Mobility Viewer - Framework for visualizing changes in urban movement

## Motivation
How are we moving around our cities while facing a global pandemic? How have lockdowns affected movement? How do we accommodate urban travel that requires social distancing? Using sensors from open data sources, we visualize movement of people. Visualization reveals the role of weather, day of week, leisure, exercise and utility travel needs and compliance in lockdown measures. It helps to anticipate transport planning needs for a safe, sustainable urban travel future.

## Locations
- Bicycle traffic in [New York City](docs/newyork/)
- Public bicycle hire use across [London](docs/london/)
- Pedestrian traffic in city centres across [Germany](docs/germany/) (and in [English](docs/germany/index_en))
- Pedestrian and bicycle travel in [Zurich](docs/zurich/) (and in [English](docs/zurich/zurich_en))
- Pedestrian and bicycle travel in [Basel](docs/basel/)

## Visualizations
The visualizations encompass dynamic heatmaps displaying traffic counts for an individual day. The heatmap is linked to a geographic map displaying the counter locations as well as to a line graph showing anomalies (the so-called Chi values) in traffic volume over time. We wouldn't have been able to implement our visualisations without the Open Data. Many thanks to administrative bodies for providing data and documentation and to [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) for mapping data.

## Build your own
This repository contains:
- [data specifications](https://github.com/jwoLondon/mobv/tree/master/dataSpecifications)
- [data analysis code](https://github.com/jwoLondon/mobv/tree/master/dataProcessing) as well as
- [visualization and front-end code](https://github.com/jwoLondon/mobv/tree/master/docs)
... necessary for you to build your own Urban Mobility Viewer. All code is open under the GNU General Public License v3.0.

## Team
Conceived and implemented by
- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City University London](https://www.gicentre.net/jwo)_

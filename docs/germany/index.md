<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Bewegung in der Corona-Zeit

Wie können wir Bewegung verstehen und vergleichen? Bewegen wir uns in der aktuellen Situation mehr oder weniger als üblich? Und wo sind wir unterwegs? Die folgenden Visualisierungen – Heatmaps, Liniengrafiken und Karten – sollen Entscheidungsträgerinnen und Entscheidungsträgern eine Übersicht geben und es ihnen erlauben, auf einfache Art Vergleiche zwischen Städten und über die Zeit anzustellen.

## Visualisierungen

Die Visualisierungen sind für unterschiedliche Fortbewegungsarten konzipiert. Für Deutschland stehen uns aktuell Daten zum Fußverkehr zur Verfügung. Statt absoluten Zahlen zeigen wir das Verhältnis aktueller Zahlen zu einem für jeden Standort einzeln berechneten Referenzwert. Der Referenzwert entspricht dem mittleren (Median) täglichen Verkehr zwischen dem 3. Januar und dem 6. Februar 2020 und wird pro Wochentag einzeln berechnet. In den Visualisierungen ist das Verhältnis aktueller Tageswerte zu diesen Referenzwerten dargestellt: in blauen Kästchen in der sogenannten Heatmap fällt das tägliche Fußverkehrsaufkommen tiefer aus als anhand der Referenz erwartet, in orangen höher. Die Zählstellen sind in der Visualisierung anhand ihres Verkehrsaufkommens sortiert: Zählstellen mit viel Verkehr sind zuoberst, Zählstellen mit tieferen Verkehrszahlen weiter unten.

Die Heatmaps sind dynamisch: Durch Überfahren (Hovern) der Balken mit der Maus werden das Verkehrsaufkommen am betreffenden Tag, der Referenzwert (Median) und die Anomalie (der sogenannte Chi-Wert) angezeigt. Mit einem Mausklick kann man eine Zählstelle selektieren, durch Betätigen der Umschalt-Taste und Mausklick mehrere gleichzeitig. Die selektierten Zählstellen werden in den begleitenden Visualisierungen – der Liniengrafik und der Karte – hervorgehoben. So können Sie schnell und einfach unterschiedliche Städte miteinander verglichen.

## Datenquellen und Umsetzung

Wir hätten unsere Visualisierungen nicht umsetzen können ohne die [Daten von HyStreet](https://hystreet.com/) und den [HyStreet R-Wrapper](https://cran.r-project.org/web/packages/hystReet/index.html). Vielen Dank!

Analoge Visualisierungen haben wir mit Open Government Data (OGD) der [Stadt Zürich](https://jwolondon.github.io/mobv/docs/zurich/), [des Kantons Basel Stadt](https://jwolondon.github.io/mobv/docs/basel), [von TfL Santander in London](https://jwolondon.github.io/mobv/docs/london/) und der [Stadt New York](https://jwolondon.github.io/mobv) umgesetzt. Sämtlicher Code für die Analyse der Daten von Deutschland, Zürich, Basel, London und New York sowie der Code hinter den jeweiligen Webseiten ist verfügbar auf [GitHub](https://github.com/jwolondon/mobv/). Sämtlicher Code steht [unter einer offenen Lizenz](https://github.com/jwoLondon/mobv/blob/master/LICENSE) zur Weiterverwendung zur Verfügung.

<div class="wide" id="visLinkedFoot"></div>

<!-- ## Datenquellen und Umsetzung
Wir hätten unsere Visualisierungen nicht umsetzen können ohne [Open Government Data (OGD) der Stadt Zürich](https://data.stadt-zuerich.ch/dataset/ted_taz_verkehrszaehlungen_werte_fussgaenger_velo). Ein großes Dankeschön geht an die Abteilung Verkehr + Stadtraum im [Tiefbauamt der Stadt Zürich](https://www.stadt-zuerich.ch/ted/de/index/taz.html) für die Erhebung der Mobilitätsdaten und die Bereitstellung als offene Verwaltungsdaten zusammen mit dem [Open Data Zürich-Team](https://www.stadt-zuerich.ch/portal/de/index/ogd.html) bei [Statistik Stadt Zürich](https://www.stadt-zuerich.ch/prd/de/index/statistik.html) sowie an die [OpenStreetMap-Beitragenden](https://www.openstreetmap.org/copyright) für die Kartendaten.

<!-- Analoge Visualisierungen haben wir mit [Open Government Data des Kantons Basel Stadt](https://jwolondon.github.io/mobv/docs/zurich/) und der [Stadt New York](https://jwolondon.github.io/mobv) umgesetzt. Sämtlicher Code für die Analyse der Daten von Zürich, Basel und New York und der Code hinter den jeweiligen Webseiten ist verfügbar auf [GitHub](https://github.com/jwolondon/mobv/). Sämtlicher Code steht [unter einer offenen Lizenz](https://github.com/jwoLondon/mobv/blob/master/LICENSE) zur Weiterverwendung zur Verfügung. -->

## Team

Konzeptiert und implementiert von:

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City, University of London](https://www.gicentre.net/jwo)_

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/germanyVisSpecs.js"></script>

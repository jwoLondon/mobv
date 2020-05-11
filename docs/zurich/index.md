<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4.5.1"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Bewegung in der Corona-Zeit

Wie können wir Bewegung verstehen und vergleichen? Bewegen wir uns in der aktuellen Situation mehr oder weniger als üblich? Und wo sind wir unterwegs? Die folgenden Visualisierungen – Heatmaps, Liniengrafiken und Karten – sollen Entscheidungsträgerinnen und Entscheidungsträgern eine Übersicht geben und es ihnen erlauben, auf einfache Art Vergleiche zwischen Standorten in der Stadt Zürich und über die Zeit anzustellen.

## Visualisierungen

Die Visualisierungen sind konzipiert für unterschiedliche Fortbewegungsarten. Bisher umgesetzt sind Analysen für den Velo- und den Fussverkehr in der Stadt Zürich. Statt absoluten Zahlen zeigen wir das Verhältnis aktueller Zahlen zu einem für jeden Standort einzeln berechneten Referenzwert. Der Referenzwert entspricht dem mittleren (Median) täglichen Verkehr zwischen dem 3. Januar und dem 6. Februar 2020 und wird pro Wochentag einzeln berechnet. In den Visualisierungen ist das Verhältnis aktueller Tageswerte zu diesen Referenzwerten dargestellt: in blauen Kästchen in der sogenannten Heatmap fällt das tägliche Fuss- bzw. Veloverkehrsaufkommen tiefer aus als anhand der Referenz erwartet, in orangen höher. Die Zählstellen sind in der Visualisierung anhand ihres Verkehrsaufkommens sortiert: Zählstellen mit viel Verkehr sind zuoberst, Zählstellen mit tieferen Verkehrszahlen weiter unten.

Die Heatmaps sind dynamisch: Durch Überfahren (Hovern) der Balken mit der Maus werden das Verkehrsaufkommen am betreffenden Tag, der Referenzwert (Median) und die Anomalie (der sogenannte Chi-Wert) angezeigt. Mit einem Mausklick kann man eine Zählstelle selektieren, durch Betätigen der Shift-Taste und Mausklick mehrere gleichzeitig. Die selektierten Zählstellen werden in den begleitenden Visualisierungen – der Liniengrafik und der Karte – hervorgehoben. So können Sie schnell und einfach unterschiedliche Standorte miteinander verglichen.

Die vertikalen Muster in der Heatmap und der Liniengrafik zeigen deutlich, wie die Mobilität in Zürich sich nach dem Lockdown Mitte März rasch reduziert – wobei sich aber nicht alle Standorte gleich verhalten. Es sind auch andere Muster sichtbar: wie der Veloverkehr in der Regel am Wochenende schnell wieder zunimmt oder wie das regnerische Wetter ab 28. April zu einem generellen und starken Rückgang des Verkehrs führt.

## Datenquellen und Umsetzung

Wir hätten unsere Visualisierungen nicht umsetzen können ohne [Open Government Data (OGD) der Stadt Zürich](https://data.stadt-zuerich.ch/dataset/ted_taz_verkehrszaehlungen_werte_fussgaenger_velo). Ein grosses Dankeschön geht an die Abteilung Verkehr + Stadtraum im [Tiefbauamt der Stadt Zürich](https://www.stadt-zuerich.ch/ted/de/index/taz.html) für die Erhebung der Mobilitätsdaten und die Bereitstellung als offene Verwaltungsdaten zusammen mit dem [Open Data Zürich-Team](https://www.stadt-zuerich.ch/portal/de/index/ogd.html) bei [Statistik Stadt Zürich](https://www.stadt-zuerich.ch/prd/de/index/statistik.html) sowie an die [OpenStreetMap-Beitragenden](https://www.openstreetmap.org/copyright) für die Kartendaten.

Analoge Visualisierungen haben wir mit [Open Government Data des Kantons Basel Stadt](https://jwolondon.github.io/mobv/docs/zurich/) und der [Stadt New York](https://jwolondon.github.io/mobv) umgesetzt. Sämtlicher Code für die Analyse der Daten von Zürich, Basel und New York und der Code hinter den jeweiligen Webseiten ist verfügbar auf [GitHub](https://github.com/jwolondon/mobv/). Sämtlicher Code steht [unter einer offenen Lizenz](https://github.com/jwoLondon/mobv/blob/master/LICENSE) zur Weiterverwendung zur Verfügung.

## Team

Konzeptiert und implementiert von:

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City University London](https://www.gicentre.net/jwo)_

# Veloverkehr

<div class="wide" id="visLinkedBicycle"></div>

# Fussverkehr

<div class="wide" id="visLinkedFoot"></div>

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/zurichVisSpecs.js"></script>

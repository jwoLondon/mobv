<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Bewegung in der Corona-Zeit

Wie können wir Bewegung verstehen und vergleichen? Bewegen wir uns in der aktuellen Situation mehr oder weniger als üblich? Und wo sind wir unterwegs? Die folgenden Visualisierungen – Heatmaps, Liniengrafiken und Karten – sollen Entscheidungsträgerinnen und Entscheidungsträgern eine Übersicht geben und es ihnen erlauben, auf einfache Art Vergleiche zwischen Standorten in Basel und über die Zeit anzustellen.

## Idee

Die Visualisierungen sind konzipiert für unterschiedliche Fortbewegungsarten. Bisher umgesetzt sind Analysen für den Velo- und den Fussverkehr in Basel. Statt absoluten Zahlen zeigen wir das Verhältnis aktueller Zahlen zu einem für jeden Standort einzeln berechneten Referenzwert. Der Referenzwert entspricht dem mittleren (Median) täglichen Verkehr zwischen dem 3. Januar und dem 6. Februar 2020 und wird pro Wochentag einzeln berechnet. In den Visualisierungen ist das Verhältnis aktueller Tageswerte zu diesen Referenzwerten dargestellt: in blauen Kästchen in der sogenannten Heatmap fällt das tägliche Fuss- bzw. Veloverkehrsaufkommen tiefer aus als anhand der Referenz erwartet, in orangen höher. Die Zählstellen sind in der Visualisierung anhand ihres Verkehrsaufkommens sortiert: Zählstellen mit viel Verkehr sind zuoberst, Zählstellen mit tieferen Verkehrszahlen weiter unten.

## Visualisierungen

Die Heatmaps sind dynamisch: Durch Überfahren (Hovern) der Balken mit der Maus werden das Verkehrsaufkommen am betreffenden Tag, der Referenzwert (Median) und die Anomalie (der sogenannte Chi-Wert) angezeigt. Mit einem Mausklick kann man eine Zählstelle selektieren, durch Betätigen der Shift-Taste und Mausklick mehrere gleichzeitig. Die selektierten Zählstellen werden in den begleitenden Visualisierungen – der Liniengrafik und der Karte – hervorgehoben. So können Sie schnell und einfach unterschiedliche Standorte miteinander verglichen.

Die vertikalen Muster in der Heatmap und der Liniengrafik zeigen deutlich, wie die Mobilität in Basel sich nach dem Lockdown Mitte März rasch reduziert – wobei sich aber nicht alle Standorte gleich verhalten. An der Zählstelle in der Gerbergasse ist zudem ersichtlich, dass während der (abgesagten) Basler Fasnacht circa doppelt so viele Leute unterwegs waren als normal. Es sind auch andere Muster sichtbar: wie der Veloverkehr vor allem am Wochenende schnell wieder zunimmt und generell am östlichen Stadtrand (Äussere Baselstrasse, Grenzacherstrasse und Birskopfsteg).

# Veloverkehr

<div class="wide" id="visLinkedBicycle"></div>

# Fussverkehr

<div class="wide" id="visLinkedFoot"></div>

## Datenquellen und Umsetzung

Wir hätten unsere Visualisierungen nicht umsetzen können ohne [Open Government Data (OGD) des Kantons Basel-Stadt](https://www.opendata.bs.ch/). Ein grosses Dankeschön auch an die [OpenStreetMap-Beitragenden](https://www.openstreetmap.org/copyright) für die Kartendaten.

Analoge Visualisierungen haben wir mit [Open Government Data der Stadt Zürich](https://jwolondon.github.io/mobv/docs/zurich) und der [Stadt New York](https://jwolondon.github.io/mobv) umgesetzt. Sämtlicher Code für die Analyse der Daten von Zürich, Basel und New York und der Code hinter den jeweiligen Webseiten ist verfügbar auf [GitHub](https://github.com/jwolondon/mobv/). Sämtlicher Code steht [unter einer offenen Lizenz](https://github.com/jwoLondon/mobv/blob/master/LICENSE) zur Weiterverwendung zur Verfügung.

## Team

Konzeptiert und implementiert von:

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City, University of London](https://www.gicentre.net/jwo)_

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/baselVisSpecs.js"></script>

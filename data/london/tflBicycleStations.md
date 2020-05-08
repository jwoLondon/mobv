---
id: litvis

elm:
  dependencies:
    gicentre/elm-vegalite: latest
    gicentre/tidy: latest
---

```elm {l=hidden}
import Tidy exposing (..)
import VegaLite exposing (..)
```

# Generating Locality Data

Using the [TfL Santander public bicycle hire scheme](https://tfl.gov.uk/modes/cycling/santander-cycles) as a proxy for active travel presents several problems. There is, for example, uncertainty as to how representative public bicycle hire use might be of more general trends in active travel. Others relate to how best to process bicycle docking station data to produce meaningful measures of activity.

TfL release live data on the status of approximately 800 docking stations around London. Each station belongs to a 'village' describing its local neighbourhood:

```elm {l=hidden}
path : String
path =
    "https://jwolondon.github.io/mobv/data/london/"


specMap : List Spec
specMap =
    let
        riversData =
            dataFromUrl (path ++ "geo/thames.json") [ topojsonFeature "thames" ]

        parksData =
            dataFromUrl (path ++ "geo/parks.json") [ topojsonFeature "parks" ]
    in
    [ asSpec [ riversData, geoshape [ maColor "rgb(228,236,246)" ] ]
    , asSpec [ parksData, geoshape [ maColor "rgb(239,244,225)" ] ]
    ]


interactiveLegend : String -> String -> Spec
interactiveLegend field selName =
    let
        enc =
            encoding
                << position Y
                    [ pName field
                    , pNominal
                    , pAxis [ axTitle "", axDomain False, axTicks False ]
                    ]
                << color
                    [ mSelectionCondition (selectionName selName)
                        [ mName field, mNominal, mLegend [] ]
                        [ mStr "lightgrey" ]
                    ]

        sel =
            selection
                << select selName seMulti [ seEncodings [ chColor ] ]
    in
    asSpec [ sel [], enc [], square [ maSize 120, maOpacity 1 ] ]
```

```elm {v interactive siding}
stationMap : Spec
stationMap =
    let
        cfg =
            configure
                << configuration (coView [ vicoStroke Nothing ])

        stationData =
            dataFromUrl "stationsOriginal.csv" []

        enc =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << color [ mName "village", mNominal, mLegend [] ]
                << tooltips
                    [ [ tName "village", tNominal ]
                    , [ tName "name", tNominal ]
                    , [ tName "id", tQuant ]
                    ]

        specStation =
            asSpec [ stationData, enc [], circle [ maSize 36, maStroke "black", maStrokeWidth 0.6 ] ]

        specMain =
            asSpec
                [ width 800
                , height 550
                , layer (specMap ++ [ specStation ])
                ]
    in
    toVegaLite
        [ cfg []
        , concat [ specMain, interactiveLegend "village" "mySel" ]
        ]
```

To reduce the number of villages, name length and make more coherent local groupings the following changes were made:

### Naming Consistency & Abbreviation

Kings Cross -> King's Cross
Parsons Green -> Parson's Green
Queen Elizabeth Olympic Park -> Olympic Park
St. James's -> St James's
St. John's Wood -> St John's Wood
St.John's Wood -> St John's Wood
St Lukes -> St Luke's
St. Luke's -> St Luke's
St. Paul's -> St Paul's
The Borough -> Borough
The Regent's Park -> Regent's Park

### Aggregation

302, Putney Pier, Wandsworth -> Putney
728, Putney Bridge Road, East Putney -> Putney
704, Mexfield Road, East Putney -> Wandsworth
719, Victoria Park Road, Hackney Central -> Victoria Park
718, Ada Street, Hackney Central -> Haggerston
783, Monier Road,Hackney Wick -> Olympic Park
790, Stratford Station,Olympic Park -> Olympic Park
768, Clapham Common North Side, Clapham Common -> Clapham
637, Spencer Park, Wandsworth Common -> Clapham
675, Usk Road, Clapham Junction -> Wandsworth
689, Spanish Road, Clapham Junction -> Wandsworth
653, Simpson Street, Clapham -> Battersea
706, Snowsfields, London Bridge -> Bermondsey
732, Duke Street Hill, London Bridge -> Borough
748, Hertford Road, De Beauvoir Town -> Haggerston
487, Canton Street, Poplar -> Limehouse
120, The Guildhall, Guildhall -> Bank
127, Wood Street, Guildhall -> Bank
509, Fore Street, Guildhall -> Bank
838, Fore Street Avenue, Guildhall -> Bank
199, Great Tower Street, Monument -> Bank
276, Lower Thames Street, Monument -> Bank
587, Monument Street, Monument -> Bank
423, Eaton Square (South), Belgravia -> Knightsbridge
181, Belgrave Square, Belgravia -> Knightsbridge
207, Grosvenor Crescent, Belgravia -> Knightsbridge
634, Brook Green South, Brook Green -> Hammersmith
775, Little Brook Green, Brook Green -> Hammersmith
393, Snow Hill, Farringdon -> Holborn
203, West Smithfield Rotunda, Farringdon -> Barbican
527, Hansard Mews, Holland Park -> Shepherd's Bush
559, Abbotsbury Road, Holland Park -> Kensington
611, Princedale Road, Holland Park -> Ladbroke Grove
606, Addison Road, Holland Park -> Ladbroke Grove
612, Wandsworth Rd, Isley Court -> Wandsworth Road
224, Queensway, Kensington Gardens -> Hyde Park
307, Black Lion Gate, Kensington Gardens -> Hyde Park
350, Queen's Gate, Kensington Gardens -> Hyde Park
404, Palace Gate, Kensington Gardens -> Hyde Park
8, Maida Vale, Maida Vale -> St John's Wood
47, Warwick Avenue Station, Maida Vale -> St John's Wood
255, Clifton Road, Maida Vale -> St John's Wood
140, Finsbury Square, Moorgate -> Liverpool Street
215, Moorfields, Moorgate -> Barbican
331, Bunhill Row, Moorgate -> Barbican
631, Battersea Park Road, Nine Elms -> Battersea Park
183, Riverlight North, Nine Elms -> Pimlico
817, Riverlight South, Nine Elms -> Pimlico
650, St. Mark's Road, North Kensington -> Portobello
807, Bevington Road West, North Kensington -> Portobello
149, Kennington Road Post Office, Oval -> Kennington
440, Kennington Oval, Oval -> Kennington
654, Ashmole Estate, Oval -> Kennington
298, Curlew Street, Shad Thames -> Bermondsey
5, Sedding Street, Sloane Square -> Knightsbridge
25, Doric Way, Somers Town -> Euston
797, Ossulston Street, Somers Town -> Euston
80, Webber Street, Southwark -> Elephant & Castle
160, Waterloo Place, St James's -> West End
228, St. James's Square, St James's -> West End
116, Little Argyll Street, West End -> Soho
79, Arundel Street, Temple -> Strand
27, Bouverie Street, Temple -> Holborn
773, Tallis Street, Temple -> St Paul's
452, St. Katharine's Way, Tower -> Wapping
104, Crosswall, Tower -> Aldgate
130, Tower Gardens, Tower -> Aldgate
739, Hortensia Road, West Brompton -> West Chelsea
757, Harcourt Terrace, West Brompton -> Earl's Court
566, Westfield Ariel Way, White City -> Avondale
601, BBC White City, White City -> Avondale
124,Eaton Square, Belgravia -> Knightsbridge
259, Bourne Street, Belgravia -> Pimlico

```elm {v interactive siding}
stationMap : Spec
stationMap =
    let
        stationData =
            dataFromUrl "stations.csv" []

        sel =
            selection
                << select "mySelection" seSingle [ seBindLegend [ blField "village" ] ]

        enc =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << color [ mName "village", mNominal ]
                << size [ mSelectionCondition (selectionName "mySelection") [ mNum 180 ] [ mNum 10 ] ]
                << tooltips
                    [ [ tName "village", tNominal ]
                    , [ tName "name", tNominal ]
                    , [ tName "id", tQuant ]
                    ]
    in
    toVegaLite
        [ width 800
        , height 550
        , stationData
        , sel []
        , enc []
        , circle []
        ]
```

From these we can create a set of village centroids (via SQLite):

```elm {v interactive siding}
villageMap : Spec
villageMap =
    let
        villageData =
            dataFromUrl "villages.csv" []

        enc =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << color [ mName "village", mNominal ]
                << tooltip [ tName "village", tNominal ]
    in
    toVegaLite
        [ width 800
        , height 550
        , villageData
        , enc []
        , circle [ maSize 200 ]
        ]
```

## SQLite Tables

### Usage table

Stores the status of all docking stations recorded at 15 minute intervals, direct from giCentre database

```sql
CREATE TABLE usage(
  stationId INTEGER NOT NULL,
  availableBikes INTEGER,
  availableDocks INTEGER,
  installed INTEGER,
  locked INTEGER,
  temporary INTEGER,
  t TEXT);
```

To update with more recent data, delete the current month:

```sql
DELETE FROM usage WHERE t > '2020-05';
```

Download the current month from remove database, and add to usage, making sure does not include header as data values:

```sql
.import useageMay2020.csv usage
DELETE FROM usage WHERE stationId = 'stationId';
```

### Stations Table

Details of each station, extracted from TfL feed (documented in parent document).

```sql
CREATE TABLE stations(
  id INTEGER NOT NULL,
  name TEXT,
  village TEXT,
  lon REAL,
  lat REAL);
```

### Villages Table

Created by renaming villages as above and calculating the centroid of all stations in each village.

```sql
SELECT village, AVG(lon), AVG(lat)
FROM stations
GROUP BY village;
```

### Join village to usage

Create a new `day_of_year` column used for temporal aggregation (just truncate the timestamp to the date part).

```sql
CREATE TABLE usage2 AS
  SELECT stationId, village, availableBikes, t, substr(t,0,11) AS day_of_year
  FROM usage
  LEFT JOIN stations ON stationId = id;
```

### Calculate activity index

For each station: accumulate the number of times number of docked bikes changes in consecutive readings on a given day. Can use the SQLite [window operations](https://www.sqlite.org/windowfunctions.html) and then sum with an [aggregate function](https://www.sqlitetutorial.net/sqlite-aggregate-functions/).

Additionally we group the results by village and day of year and create an id that combines village name with day of week.

Note also that to be consistent with other datasets, we rename 'village' as 'station' even though it is an aggregation of several stations in a local region of London.

```sql
CREATE TABLE station_daily_time_series AS SELECT day_of_year AS date, village AS station, village||'_'||strftime('%w',day_of_year) AS id, SUM(activity) AS count FROM (SELECT stationID, village, day_of_year, abs(first_value(availableBikes) OVER win - last_value(availableBikes) OVER win) AS activity FROM usage2 WINDOW win AS (PARTITION BY stationId ORDER BY t ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) ) GROUP BY village, day_of_year ORDER BY day_of_year,village;
```

### Calculate benchmark data

In the example below we take the average for January grouped by day of week (i.e. around 4 readings per village).

```sql
CREATE TABLE station_reference_bicycle AS
  SELECT id,AVG(count) AS count
  FROM station_daily_time_series
  WHERE date < '2020-02-01'
  GROUP BY id;
```

And then export:

```sql
.headers on
.mode csv
.output StationReference-Bicycle.csv
SELECT id,count FROM station_reference_bicycle ORDER BY id;
.quit
```

### Export station daily time series

```sql
.headers on
.mode csv
.output StationDailyTimeSeries-Bicycle.csv
SELECT date,station,id,count FROM station_daily_time_series ORDER BY date,id;
.quit
```

# Visualization

```elm {v interactive}
londonExample : Spec
londonExample =
    let
        localityData =
            dataFromUrl (path ++ "stationLocations-Bicycle.csv") []

        timeSeriesData =
            dataFromUrl (path ++ "StationDailyTimeSeries-Bicycle.csv") []

        referenceData =
            dataFromUrl (path ++ "StationReference-Bicycle.csv") []

        annotationData =
            dataFromUrl (path ++ "annotations.csv") []

        cfg =
            configure
                << configuration (coView [ vicoStroke Nothing ])

        -- Grid View
        sel =
            selection
                << select "brush" seMulti [ seEncodings [ chY ] ]

        trans =
            transform
                << lookup "id" referenceData "id" (luFields [ "value" ])
                << calculateAs "datum.value == 0 ? 0 : (datum.count - datum.value)/sqrt(datum.value)" "anomaly"
                << lookup "station" localityData "station_id" (luFields [ "station_name" ])
                << filter (fiExpr "datum.station_name != null")

        gridEnc =
            encoding
                << position X
                    [ pName "date"
                    , pTemporal
                    , pAxis
                        [ axDataCondition (expr "day(datum.value) == 6 || day(datum.value) == 0") (cAxGridOpacity 1 0)
                        , axTickCount 100
                        , axGridWidth 8
                        , axGridColor "#f6f6f6"
                        , axLabelExpr "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''"
                        , axTitle ""
                        ]
                    ]
                << position Y
                    [ pName "station_name"
                    , pNominal
                    , pSort [ soByField "count" opSum, soDescending ]
                    , pAxis [ axTitle "", axOffset 7, axDomain False, axTicks False ]
                    ]
                << color
                    [ mName "anomaly"
                    , mQuant
                    , mScale [ scScheme "blueOrange" [], scDomainMid 0 ]
                    , mLegend
                        [ leTitle "Anomaly"
                        , leDirection moHorizontal
                        , leOrient loTop
                        , leGradientThickness 8
                        ]
                    ]
                << opacity [ mSelectionCondition (selectionName "brush") [ mNum 1 ] [ mNum 0.5 ] ]
                << size [ mSelectionCondition (selectionName "brush") [ mNum 90 ] [ mNum 40 ] ]
                << tooltips
                    [ [ tName "station_name", tNominal, tTitle "locality" ]
                    , [ tName "date", tTemporal, tFormat "%a %e %b" ]
                    , [ tName "value", tQuant, tTitle "expected" ]
                    , [ tName "count", tQuant, tTitle "observed" ]
                    , [ tName "anomaly", tQuant, tFormat ".1f" ]
                    ]

        cellSpec =
            asSpec
                [ timeSeriesData
                , trans []
                , sel []
                , gridEnc []
                , square []
                ]

        leaderEnc =
            encoding
                << position X [ pName "date", pTemporal ]

        leaderSpec =
            asSpec [ leaderEnc [], rule [ maStrokeDash [ 4, 2 ], maOpacity 0.5 ] ]

        labelEnc =
            encoding
                << position X [ pName "date", pTemporal ]
                << position Y [ pNum 0 ]
                << text [ tName "notes", tNominal ]

        labelSpec =
            asSpec
                [ labelEnc []
                , textMark [ maAngle -50, maAlign haLeft, maOpacity 0.5, maFontSize 8, maDx 2 ]
                ]

        annotationSpec =
            asSpec [ annotationData, layer [ leaderSpec, labelSpec ] ]

        specGrid =
            asSpec
                [ width 800
                , heightStep 12
                , layer [ cellSpec, annotationSpec ]
                ]

        -- Time lines
        encTimeline =
            encoding
                << position X
                    [ pName "date"
                    , pTemporal
                    , pAxis
                        [ axDataCondition (expr "day(datum.value) == 6 || day(datum.value) == 0") (cAxGridOpacity 1 0)
                        , axTickCount 100
                        , axGridWidth 8
                        , axGridColor "#f6f6f6"
                        , axLabelExpr "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''"
                        , axTitle ""
                        ]
                    ]
                << position Y
                    [ pName "anomaly"
                    , pQuant
                    , pScale [ scDomain (doNums [ -50, 50 ]), scNice niFalse ]
                    , pTitle "Anomaly"
                    ]
                << color
                    [ mSelectionCondition (selectionName "brush")
                        [ mName "station_name"
                        , mNominal
                        , mLegend [ leTitle "", leColumns 4, leOrient loBottomLeft, leLabelFontSize 8 ]
                        , mSort [ soByField "count" opSum, soDescending ]
                        ]
                        [ mStr "black" ]
                    ]
                << opacity [ mSelectionCondition (selectionName "brush") [ mNum 1 ] [ mNum 0.2 ] ]
                << size [ mSelectionCondition (selectionName "brush") [ mNum 1 ] [ mNum 0.3 ] ]

        lineSpec =
            asSpec
                [ timeSeriesData
                , trans []
                , sel []
                , encTimeline []
                , line [ maInterpolate miMonotone, maClip True ]
                ]

        ruleData =
            dataFromColumns []
                << dataColumn "origin" (nums [ 0 ])

        ruleEnc =
            encoding
                << position Y [ pName "origin", pQuant ]

        ruleSpec =
            asSpec [ ruleData [], ruleEnc [], rule [] ]

        leader2Spec =
            asSpec [ annotationData, leaderEnc [], rule [ maStrokeDash [ 4, 2 ], maOpacity 0.5 ] ]

        timelineSpec =
            asSpec
                [ width 800
                , height 400
                , layer [ lineSpec, ruleSpec, leader2Spec ]
                ]

        specTimeCharts =
            asSpec [ columns 1, concat [ specGrid, timelineSpec ] ]

        -- Map
        transStations =
            transform
                << filter (fiExpr "datum.lon != 0 || datum.lat != 0")
                << filter (fiSelection "brush")

        encStations =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]

        specStations =
            asSpec [ localityData, encStations [], transStations [], circle [] ]

        encStationLabels =
            encStations
                << text [ tName "station_name", tNominal ]

        specStationLabels =
            asSpec
                [ localityData
                , transStations []
                , encStationLabels []
                , textMark [ maAlign haLeft, maDx 4, maOpacity 0.3, maFontSize 8 ]
                ]
    in
    toVegaLite
        [ cfg []
        , spacing 0
        , padding (paEdges 10 0 0 0)
        , columns 1
        , concat
            [ specGrid
            , timelineSpec
            , asSpec [ width 800, height 650, layer (specMap ++ [ specStations, specStationLabels ]) ]
            ]
        ]
```

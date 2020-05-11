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

# Generating London Locality Data

Using the [TfL Santander public bicycle hire scheme](https://tfl.gov.uk/modes/cycling/santander-cycles) as a proxy for active travel presents several problems. There is, for example, uncertainty as to how representative public bicycle hire use might be of more general trends in active travel. Others relate to how best to process bicycle docking station data to produce meaningful measures of activity.

TfL release live data on the status of approximately 800 docking stations around London. Each station belongs to a 'village' describing its local neighbourhood (click on station to see others in the same village; double-click to see all stations):

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


stationMap : String -> Bool -> Spec
stationMap stationFile showRegions =
    let
        cfg =
            configure
                << configuration (coView [ vicoStroke Nothing ])

        stationData =
            dataFromUrl (path ++ stationFile) []

        localityData =
            dataFromUrl (path ++ "geo/localities.json?") [ topojsonFeature "localities" ]

        sel =
            selection
                << select "legSel" seMulti [ seNearest True, seFields [ "village" ] ]

        enc =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << color
                    [ mSelectionCondition (selectionName "legSel")
                        [ mName "village"
                        , mNominal
                        , mLegend []
                        ]
                        [ mStr "grey" ]
                    ]
                << opacity
                    [ mSelectionCondition (selectionName "legSel")
                        [ mNum 0.8 ]
                        [ mNum 0.3 ]
                    ]
                << size
                    [ mSelectionCondition (selectionName "legSel")
                        [ mNum 48 ]
                        [ mNum 24 ]
                    ]
                << tooltips
                    [ [ tName "village", tNominal ]
                    , [ tName "name", tNominal ]
                    , [ tName "id", tQuant ]
                    ]

        specLocalities =
            asSpec [ localityData, geoshape [ maStroke "black", maOpacity 0.3, maFilled False ] ]

        specStation =
            asSpec [ sel [], enc [], circle [ maSize 48, maStroke "black", maStrokeWidth 0.6 ] ]
    in
    toVegaLite
        [ cfg []
        , stationData
        , width 800
        , height 550
        , layer
            (specMap
                ++ (if showRegions then
                        [ specLocalities, specStation ]

                    else
                        [ specStation ]
                   )
            )
        ]
```

^^^elm {v=(stationMap "tflBicycleStations.csv" False) interactive}^^^

Groupings vary considerably in size and there is some inconsistency in geographic placement and in naming, so to reduce the number of localities, the following changes were made:

#### Naming Consistency & Abbreviation

| Old name                     | New name       |
| ---------------------------- | -------------- |
| Kings Cross                  | King's Cross   |
| Parsons Green                | Parson's Green |
| Queen Elizabeth Olympic Park | Olympic Park   |
| St. James's                  | St James's     |
| St. John's Wood              | St John's Wood |
| St.John's Wood               | St John's Wood |
| St Lukes                     | St Luke's      |
| St. Luke's                   | St Luke's      |
| St. Paul's                   | St Paul's      |
| The Borough                  | Borough        |
| The Regent's Park            | Regent's Park  |

#### Aggregation

| id  | Station                     | Old village        | New locality      |
| --- | --------------------------- | ------------------ | ----------------- |
| 5   | Sedding Street              | Sloane Square      | Knightsbridge     |
| 8   | Maida Vale                  | Maida Vale         | St John's Wood    |
| 25  | Doric Way                   | Somers Town        | Euston            |
| 27  | Bouverie Street             | Temple             | Holborn           |
| 47  | Warwick Avenue Station      | Maida Vale         | St John's Wood    |
| 79  | Arundel Street              | Temple             | Strand            |
| 80  | Webber Street               | Southwark          | Elephant & Castle |
| 104 | Crosswall                   | Tower              | Aldgate           |
| 107 | Finsbury Leisure Centre     | St Luke's          | Finsbury          |
| 116 | Little Argyll Street        | West End           | Soho              |
| 120 | The Guildhall               | Guildhall          | Bank              |
| 124 | Eaton Square                | Belgravia          | Knightsbridge     |
| 127 | Wood Street                 | Guildhall          | Bank              |
| 130 | Tower Gardens               | Tower              | Aldgate           |
| 140 | Finsbury Square             | Moorgate           | Liverpool Street  |
| 149 | Kennington Road Post Office | Oval               | Kennington        |
| 160 | Waterloo Place              | St James's         | West End          |
| 181 | Belgrave Square             | Belgravia          | Knightsbridge     |
| 183 | Riverlight North            | Nine Elms          | Battersea Park    |
| 199 | Great Tower Street          | Monument           | Bank              |
| 203 | West Smithfield Rotunda     | Farringdon         | Barbican          |
| 207 | Grosvenor Crescent          | Belgravia          | Knightsbridge     |
| 215 | Moorfields                  | Moorgate           | Barbican          |
| 224 | Queensway                   | Kensington Gardens | Hyde Park         |
| 228 | St. James's Square          | St James's         | West End          |
| 247 | St. John's Wood Church      | Regent's Park      | St John's Wood    |
| 255 | Clifton Road                | Maida Vale         | St John's Wood    |
| 259 | Bourne Street               | Belgravia          | Pimlico           |
| 267 | Regency Street              | Westminster        | Pimlico           |
| 276 | Lower Thames Street         | Monument           | Bank              |
| 298 | Curlew Street               | Shad Thames        | Bermondsey        |
| 302 | Putney Pier                 | Wandsworth         | Putney            |
| 307 | Black Lion Gate             | Kensington Gardens | Hyde Park         |
| 331 | Bunhill Row                 | Moorgate           | Barbican          |
| 350 | Queen's Gate                | Kensington Gardens | Hyde Park         |
| 393 | Snow Hill                   | Farringdon         | Holborn           |
| 404 | Palace Gate                 | Kensington Gardens | Hyde Park         |
| 423 | Eaton Square (South)        | Belgravia          | Knightsbridge     |
| 440 | Kennington Oval             | Oval               | Kennington        |
| 452 | St. Katharine's Way         | Tower              | Wapping           |
| 459 | Gunmakers Lane              | Old Ford           | Victoria Park     |
| 467 | Southern Grove              | Bow                | Mile End          |
| 487 | Canton Street               | Poplar             | Limehouse         |
| 509 | Fore Street                 | Guildhall          | Bank              |
| 521 | Driffield Road              | Old Ford           | Victoria Park     |
| 527 | Hansard Mews                | Holland Park       | Shepherd's Bush   |
| 559 | Abbotsbury Road             | Holland Park       | Kensington        |
| 566 | Westfield Ariel Way         | White City         | Avondale          |
| 587 | Monument Street             | Monument           | Bank              |
| 601 | BBC White City              | White City         | Avondale          |
| 606 | Addison Road                | Holland Park       | Ladbroke Grove    |
| 611 | Princedale Road             | Holland Park       | Ladbroke Grove    |
| 612 | Wandsworth Rd               | Isley Court        | Wandsworth Road   |
| 631 | Battersea Park Road         | Nine Elms          | Battersea Park    |
| 634 | Brook Green South           | Brook Green        | Hammersmith       |
| 637 | Spencer Park                | Wandsworth Common  | Clapham           |
| 648 | Peterborough Road           | Sands End          | Parson's Green    |
| 650 | St. Mark's Road             | North Kensington   | Portobello        |
| 653 | Simpson Street              | Clapham            | Battersea         |
| 654 | Ashmole Estate              | Oval               | Kennington        |
| 673 | Hibbert Street              | Battersea          | Wandsworth        |
| 675 | Usk Road                    | Clapham Junction   | Wandsworth        |
| 689 | Spanish Road                | Clapham Junction   | Wandsworth        |
| 704 | Mexfield Road               | East Putney        | Wandsworth        |
| 706 | Snowsfields                 | London Bridge      | Bermondsey        |
| 707 | Barons Court Station        | West Kensington    | Hammersmith       |
| 718 | Ada Street                  | Hackney Central    | Haggerston        |
| 719 | Victoria Park Road          | Hackney Central    | Victoria Park     |
| 728 | Putney Bridge Road          | East Putney        | Putney            |
| 732 | Duke Street Hill            | London Bridge      | Borough           |
| 739 | Hortensia Road              | West Brompton      | West Chelsea      |
| 748 | Hertford Road               | De Beauvoir Town   | Haggerston        |
| 742 | Blenheim Crescent           | Ladbroke Grove     | Portobello        |
| 757 | Harcourt Terrace            | West Brompton      | Earl's Court      |
| 768 | Clapham Common North Side   | Clapham Common     | Clapham           |
| 769 | Sandilands Road             | Walham Green       | Sands End         |
| 773 | Tallis Street               | Temple             | St Paul's         |
| 775 | Little Brook Green          | Brook Green        | Hammersmith       |
| 783 | Monier Road                 | Hackney Wick       | Olympic Park      |
| 790 | Stratford Station           | Olympic Park       | Olympic Park      |
| 793 | Cromer Street               | Bloomsbury         | Clerkenwell       |
| 797 | Ossulston Street            | Somers Town        | Euston            |
| 807 | Bevington Road West         | North Kensington   | Portobello        |
| 817 | Riverlight South            | Nine Elms          | Battersea Park    |
| 838 | Fore Street Avenue          | Guildhall          | Bank              |

This reduces the number of localities to 84:

^^^elm {v=(stationMap "tflBicycleStationsWithLocalities.csv" True) interactive}^^^

The table of modified station localities is stored in an SQLite database:

```sql
CREATE TABLE stations(id INTEGER NOT NULL, name TEXT, village TEXT, lon REAL, lat REAL);
.mode csv
.import tflBicycleStationsWithLocalities.csv stations
```

From these we can create a set of locality centroids that we use as the basis of activity mapping, where each locality is associated with the bicycle activity of all the docking stations within it (noting the names `station_id` and `station_name` are used for consistency with other city data even though each is a collection of docking stations):

```sql
CREATE TABLE villages AS
SELECT village AS station_id, village AS station_name, AVG(lat) AS lat, AVG(lon) AS lon
FROM stations
GROUP BY village;
```

```elm {v interactive siding}
localityMap : Spec
localityMap =
    let
        cfg =
            configure
                << configuration (coView [ vicoStroke Nothing ])

        centroidData =
            dataFromUrl (path ++ "stationLocations-Bicycle.csv") []

        localityData =
            dataFromUrl (path ++ "geo/localities.json") [ topojsonFeature "localities" ]

        enc =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << color [ mName "station_name", mNominal, mLegend [] ]

        specStation =
            asSpec [ enc [], square [ maSize 60, maStroke "black", maStrokeWidth 0.6 ] ]

        encLabels =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << text [ tName "station_name", tNominal ]

        specLabels =
            asSpec [ encLabels [], textMark [ maDy 10, maFontSize 10 ] ]

        specLocalities =
            asSpec [ localityData, geoshape [ maStroke "black", maOpacity 0.1, maFilled False ] ]
    in
    toVegaLite
        [ cfg []
        , centroidData
        , width 800
        , height 550
        , layer (specMap ++ [ specLocalities, specStation, specLabels ])
        ]
```

## Generating Locality Activity Values with SQLite

Bicycle activity is generated from the TfL feed that indicates the status of each docking station. We log this feed at 10 minute intervals storing the data in an SQL table:

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

To update with more recent data, ensure the most recent data are at the end of a day and then update from the following day onwards. For example

```sql
DELETE FROM usage WHERE t > '2020-05-05';
```

Download the current month from remote database, and add to usage:

```sql
.mode csv
.import myUpdatedData.csv usage
```

### Join locality to usage

Because docking stations are referenced only by their id, we need to join the locality to each reading. We also create a new `day_of_year` column for temporal aggregation by truncating the timestamp of each reading:

```sql
CREATE TABLE usage2 AS
  SELECT stationId, village, availableBikes, t, substr(t,0,11) AS day_of_year
  FROM usage
  LEFT JOIN stations ON stationId = id;
```

### Calculate activity index

For each station: accumulate the number of times number of docked bikes changes in consecutive readings on a given day. Can use the SQLite [window operations](https://www.sqlite.org/windowfunctions.html) and then sum with an [aggregate function](https://www.sqlitetutorial.net/sqlite-aggregate-functions/).

Additionally we group the results by village and day of year and create an id that combines village name with day of week.

Note also that to be consistent with other datasets, we rename 'village' as 'station' even though it is an aggregation of several stations in a locality.

```sql
CREATE TABLE station_daily_time_series AS
  SELECT
    day_of_year AS date,
    village AS station,
    village||'_'||strftime('%w',day_of_year) AS id,
    SUM(activity) AS count
  FROM
    ( SELECT
        stationID,
        village,
        day_of_year,
        abs(first_value(availableBikes) OVER win - last_value(availableBikes) OVER win) AS activity
      FROM usage2 WINDOW win AS
        (PARTITION BY stationId ORDER BY t ROWS BETWEEN 1 PRECEDING AND CURRENT ROW)
    )
  GROUP BY village, day_of_year
  ORDER BY day_of_year,village;
```

### Calculate benchmark data

To calculate expected activity for each locality we take the mean activity for January grouped by day of week:

```sql
CREATE TABLE station_reference_bicycle AS
  SELECT id,AVG(count) AS value
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
                << select "brush" seMulti [ seFields [ "station_name" ] ]

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
                [ sel []
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
                        , mLegend []
                        ]
                        [ mStr "black" ]
                    ]
                << opacity [ mSelectionCondition (selectionName "brush") [ mNum 1 ] [ mNum 0.1 ] ]
                << size [ mSelectionCondition (selectionName "brush") [ mNum 2 ] [ mNum 0.2 ] ]

        lineSpec =
            asSpec
                [ sel []
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
        encStations =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << color [ mName "station_name", mNominal, mLegend [] ]
                << opacity [ mSelectionCondition (selectionName "brush") [ mNum 1 ] [ mNum 0.1 ] ]

        transStations =
            transform
                << aggregate [ opAs opCount "station_name" "numReadings" ] [ "station_name" ]
                << lookup "station_name" localityData "station_name" (luFields [ "lon", "lat" ])

        specStations =
            asSpec [ sel [], encStations [], square [ maSize 80 ] ]

        encStationLabels =
            encoding
                << position Longitude [ pName "lon", pQuant ]
                << position Latitude [ pName "lat", pQuant ]
                << text [ tName "station_name", tNominal ]
                << opacity [ mSelectionCondition (selectionName "brush") [ mNum 1 ] [ mNum 0.1 ] ]

        specStationLabels =
            asSpec [ encStationLabels [], textMark [ maDy 10, maFontSize 10 ] ]
    in
    toVegaLite
        [ cfg []
        , spacing 0
        , padding (paEdges 10 0 0 0)
        , timeSeriesData
        , trans []
        , vConcat
            [ specGrid
            , timelineSpec
            , asSpec [ width 800, height 650, transStations [], layer (specMap ++ [ specStations, specStationLabels ]) ]
            ]
        ]
```

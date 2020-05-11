<!-- Scripts to link to the Vega/Vega-Lite runtime -->
<script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-lite@4"></script>
<script src="https://cdn.jsdelivr.net/npm/vega-embed@6"></script>

# Generating London Locality Data

Using the [TfL Santander public bicycle hire scheme](https://tfl.gov.uk/modes/cycling/santander-cycles) as a proxy for active travel presents several problems. There is, for example, uncertainty as to how representative public bicycle hire use might be of more general trends in active travel. Others relate to how best to process bicycle docking station data to produce meaningful measures of activity.

TfL release live data on the status of approximately 800 docking stations around London. Each station belongs to a 'village' describing its local neighbourhood (click on station to see others in the same village; double-click to see all stations):

<div class="wide" id="visTfLStations"></div>

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

<div class="wide" id="visTfLModifiedStations"></div>

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

<div class="wide" id="visLocalities"></div>

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

## Visualization

We can now use the generated files in the visualization specification just as we would for more direct sensor measurements.

<div class="wide" id="visLinkedBicycle"></div>

<!-- Script containing the vis specs used above. Must be at end of document. -->
<script src="js/londonDataProcessing.js"></script>

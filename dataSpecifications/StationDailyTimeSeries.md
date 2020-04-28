# Data structure
A tidy file data storing a time series from all stations for a specific counter type (e.g. bike, foot, etc.). The rows in the file are unique (i.e. no duplicates) - this is a requirement for calculating benchmarks. Sorting by date is option, but helpful for quick sanity checks.

# Data types
- date and time (string): dates and times are stored as [ISO 8601](https://www.w3.org/TR/NOTE-datetime) values. At a minimum (for daily data) dates are represented thus: <YYYY-MM-DD> (eg 2020-04-01). Where benchmarks are calculated over finer intervals (e.g. a median for a 6 hour period) then the granularity of the data must be increase, and dates and times are stored accordingly: <YYYY-MM-DDThh:mmTZD> (e.g. 2020-04-01T09:00+01:00) for 0900 on 1st April in Zurich.
- station id: Together with benchmark units these can be concatenated to for an identifier in the StationDailyTimeSeries.md. Station ids map onto the unique values found in StationLocations.md
- benchmark key: all data are benchmarked over individual stations for a given period. Unique key to the data stored in a [BenchmarkFile.md](BenchmarkFile.md) are stored here, and are made up of station_ids (string) (c.f. [StationLocations.md](StationLocations.md) concantenated with temporal periods (e.g. VCS_BINZ_3 is associated with the station VCS_BINZ on Wednesdays). The temporal period is derived from the date and time and must be consistent therewith. 
- counts (integer): counts represent the total (cross-sectional) count for that station
aggregated over a date and time

# Conventions
Files pertaining to traffic are named accordingly (e.g. `StationDailyTimeSeries-Bicycle.csv`for bicycle counts or `StationDailyTimeSeries-Foot.csv`) for pedestrian counts. Files are comma delineated and UTF-8-encoded. All stations have unique IDs. 

# Example
Sample file structure
```
date,station,id,count
2020-01-01,VZS_ANDR,VZS_ANDR_3,140
2020-01-01,VZS_BERT,VZS_BERT_3,277
2020-01-01,VZS_BINZ,VZS_BINZ_3,78
2020-01-02,VZS_ANDR,VZS_ANDR_4,167
2020-01-02,VZS_BERT,VZS_BERT_4,404
2020-01-02,VZS_BINZ,VZS_BINZ_4,117

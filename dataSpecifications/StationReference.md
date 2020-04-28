A station reference or benchmark file contains the values used to compare the daily time series data. Every unit (station and temporal unit) has a unique key and an associated benchmark value stored as an integer or double. Since every unit has a unique key, the rows in a benchmark file are by definition also unique. The files are stored as tidy files with two columns:

- benchmark units: all data are benchmarked over a given period (here a day of the week stored as an integer, may also be Strings (e.g. Monday)).
- station id: Together with benchmark units these can be concatenated to for an identifier in the [StationDailyTimeSeries.md](StationDailyTimeSeries.md). Station ids map onto the unique values found in [StationLocations.md](StationLocations.md)
- benchmark values:  benchmark values calculated for this station and temporal period. Benchmark values are used for comparison, they may be e.g. medians or means (integers or doubles)

# Example
Sample file structure
```
dayofweek,station,median
1,VZS_ANDR,672
1,VZS_BERT,1199
1,VZS_BINZ,505
2,VZS_ANDR,603
2,VZS_BERT,1177
2,VZS_BINZ,382

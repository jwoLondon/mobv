# Data structure
A station reference or benchmark file contains the values used to compare the daily time series data. Every unit (station and temporal) has a unique key and an associated benchmark value stored as an integer or double. Since every unit has a unique key, the rows in a benchmark file are by definition also unique.

# Data types
- `id` (string): Unique ID of the benchmark measure. All data are benchmarked over individual stations for a given time period. `id` is made up of `station_id`s (c.f. [StationLocations.md](StationLocations.md) concatenated with temporal periods (e.g. `VCS_BINZ_3` is associated with the station `VCS_BINZ` on Wednesdays). All data are benchmarked over a given time period (here a day of the week stored as an integer, may also be Strings (e.g. `VCS_BINZ_Monday`)). 
- `value` (integer or double): Benchmark value calculated for this station and temporal period. Benchmark values are used for comparison, they may be e.g. medians or means.

# Conventions
Files pertaining to different transport modes are named accordingly (e.g. `StationReference-Bicycle.csv`for bicycle counts or `StationReference-Foot.csv` for pedestrian counts). Files are comma delineated and UTF-8-encoded. All stations have unique IDs. 

# Example
Sample file structure
```
id,value
VZS_ANDR_1,672
VZS_BERT_1,1199
VZS_BINZ_1,505
VZS_ANDR_2,603
VZS_BERT_2,1177
VZS_BINZ_2,382

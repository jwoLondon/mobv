# Data structure
A tidy file storing a time series from all stations for a specific counter type (e.g. bike, foot, etc.). The rows in the file are unique (i.e. no duplicates) - this is a requirement for calculating benchmarks. Sorting by date is optional, but helpful for quick sanity checks.

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

# File structure
A file containing metadata for all counting stations.

# Data types
- `station_id` (string): Counting station ID (primary key).
- `station_name` (string): Human-friendly counting station name.
- `description` (string; non-mandatory)
- `lat` (float): Latitude of station location (in [WGS 1984](https://epsg.io/4326), decimal degrees)
- `lon` (float): Longitude of station location (in [WGS 1984](https://epsg.io/4326), decimal degrees)

# Conventions
Files pertaining to different transport modes are named accordingly (e.g. StationLocations-Bicycle.csvfor bicycle counting stations or StationLocations-Foot.csv for pedestrian counting stations). Files are comma delineated and UTF-8-encoded. Each station has a unique `station_id`. The `station_name` is only used for labeling purposes in plots and maps.


# Example
Sample file structure (whitespace for readability)
```
station_id,     station_name,     description,      lat,        lon
MST             Main Street,      ...        ,      46.5324,    7.5617
SST             Station Street,   ...        ,      46.4231,    7.6289
...  
...
```

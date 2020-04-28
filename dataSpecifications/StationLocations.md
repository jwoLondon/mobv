# File structure
A file containing metadata for all counting stations.

# Data types
- station_id (string): station name (primary key)
- station_name (string): human-friendly station name
- description (string; non-mandatory)
- lat (float): latitude of station location (WGS 1984, decimal degrees)
- lon (float): longitude of station location (WGS 1984, decimal degrees)

# Conventions
The file is comma delineated and UTF-8-encoded. Each station has a unique station name.

# Example
Sample file structure (whitespace for readability)
```
station_id,     station_name,     description,      lat,        lon
MST             Main Street,      ...        ,      46.5324,    7.5617
SST             Station Street,   ...        ,      46.4231,    7.6289
...  
...
```

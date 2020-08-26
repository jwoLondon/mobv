library(tidyverse)
library(lubridate)


# Read input data
df <- read_csv("https://data.cityofnewyork.us/api/views/uczf-rk3c/rows.csv?accessType=DOWNLOAD",
               col_types = cols_only("id" = col_character(),
                                     "date" = col_character(),
                                     "counts" = col_integer(),
                                     "status" = col_integer()))

names(df) <- c("station", "count", "date", "status")

# Datetime format is: 01/27/2020 07:43:25 AM
df$datetime <- parse_date_time2(df$date, "m!/*d!/Y! H!:M!:S! p!", tz = "America/New_York")

df <- filter(df, datetime >= ymd("2020-01-01", tz = "America/New_York"))

df$date <- strftime(df$datetime, "%Y-%m-%d", tz = "America/New_York")
df$dayofweek <- strftime(df$date, "%u", tz = "America/New_York")

# Compute daily values
df %>%
  distinct() %>%
  group_by(station, date, dayofweek) %>%
  summarise(count = sum(count), n = n()) %>%
  ungroup() -> df_daily

df_daily$id <- str_c(df_daily$station, "_", df_daily$dayofweek)

df_daily <- df_daily[order(df_daily$date),]


df_daily <- df_daily %>%
  # Remove stations that are at 0 / 0 ("Null Island") 
  filter(!(station %in% c("100055175", "101055175", "103055175", "102055175", 
                          "104055175", "100048744", "103048744", "101048744",
                          "104048744", "102048744"))) %>%
  # Remove stations that are summarised in station "100047029"
  filter(!(station %in% c("101047029", "102047029"))) %>%
  # Remove stations that stopped recording in January 2020
  filter(!(station %in% c("100057318", "101057318", "102057318"))) %>%
  # Remove stations with low counts that are far out
  filter(!(station %in% c("101010017", "102010017"))) %>%
  # Remove "Southbound" and "Northbound" redundant stations
  filter(!(station %in% c("101009424", "102010020", "102009424", "101010020")))


df_daily %>%
  select(date, station, id, count) %>%
  write_csv("../../data/newyork/StationDailyTimeSeries-Bicycle.csv", na="") 

# Compute and save baseline:
# Google: "The baseline is the median value, for the corresponding day of the 
# week, during the 5-week period Jan 3–Feb 6, 2020. 

df_daily %>%
  filter(date >= ymd("2020-01-03", tz = "America/New_York") & date <= ymd("2020-02-06", tz = "America/New_York")) %>%
  group_by(id) %>%
  summarise(value = median(count)) %>%
  write_csv("../../data/newyork/StationReference-Bicycle.csv", na="") 



df_meta <- read_csv("https://data.cityofnewyork.us/api/views/smn3-rzf9/rows.csv?accessType=DOWNLOAD", 
                    col_types = cols_only(id = col_character(),
                                          name = col_character(), 
                                          latitude = col_double(),
                                          longitude = col_double()))

df_meta <- transmute(df_meta, station_id = id,
                     station_name = name, 
                     description = "",
                     lat = latitude,
                     lon = longitude)

# Remove stations that are at 0 / 0 ("Null Island") 
df_meta <- df_meta %>%
  filter(!(station_id %in% c("100055175", "101055175", "103055175", "102055175", 
                          "104055175", "100048744", "103048744", "101048744",
                          "104048744", "102048744"))) %>%
  # Remove stations that are summarised in station "100047029"
  filter(!(station_id %in% c("101047029", "102047029"))) %>%
  # Remove stations that stopped recording in January 2020
  filter(!(station_id %in% c("100057318", "101057318", "102057318"))) %>%
  # Remove stations with low counts that are far out
  filter(!(station_id %in% c("101010017", "102010017"))) %>%
  # Remove "Southbound" and "Northbound" redundant stations
  filter(!(station_id %in% c("101009424", "102010020", "102009424", "101010020")))





df_meta$station_name <- str_replace_all(df_meta$station_name, coll("St."), "St")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("ST."), "St")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Street"), "St")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Avenue"), "Av")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Ave"), "Av")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Bridge"), "Br")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" and "), " & ")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("IN"), "In")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("OUT"), "Out")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Ed Koch "), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" Shared Path"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("  Cyclists Northbound"), " Northbound")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("  Cyclists Southbound"), " Southbound")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("  Cyclists"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Prospect Park West"), "Prospect Park W")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" bound"), "-bound")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" Bound"), "-bound")

# Move Staten Island closer to Manhattan for cartographic reasons
df_meta$lat[df_meta$station_id == "100010017"] <- 40.702
df_meta$lon[df_meta$station_id == "100010017"] <- -74.023

df_meta %>%
  write_csv("../../data/newyork/StationLocations-Bicycle.csv")


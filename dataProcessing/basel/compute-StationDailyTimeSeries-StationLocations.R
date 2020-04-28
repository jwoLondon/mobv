library(tidyverse)
library(lubridate)
library(jsonlite)


# Read input data
df_v <- read_csv("https://data.bs.ch/explore/dataset/100013/download/?format=csv&q=year%3D2020&refine.traffictype=Velo&timezone=Europe/Zurich&lang=en&use_labels_for_header=true&csv_separator=,")
df_f <- read_csv("https://data.bs.ch/explore/dataset/100013/download/?format=csv&q=year%3D2020&refine.traffictype=Fussgänger&timezone=Europe/Zurich&lang=en&use_labels_for_header=true&csv_separator=,")

df <- rbind(df_f, df_v)

df_meta <- df %>%
  select(ZST_NR, SiteName, TrafficType, "Geo Point") %>%
  distinct()
names(df_meta) <- c("station_id", "station_name", "type", "location")

df <- df %>%
  select(ZST_NR, Date, TrafficType, Total)
names(df) <- c("station", "date", "type", "count")


# Datetime format is: 31.01.2020
df$date <- parse_date_time2(df$date, "*d!.m!.Y!", tz = "Europe/Berlin")
df$dayofweek <- strftime(df$date, "%u", tz = "Europe/Berlin")
df <- df[order(df$date),]

# Quick Q/A
df %>%
  group_by(station, type) %>%
  summarise(number_of_records = n()) %>% View()

# Compute daily values
df %>%
  filter(!is.na(count)) %>%
  group_by(station, date, dayofweek, type) %>%
  summarise(count = sum(count), n_records = n()) %>%
  ungroup() -> df_daily
summary(df_daily)

df_daily$id <- str_c(df_daily$station, "_", df_daily$dayofweek)

df_daily <- df_daily[order(df_daily$date),]

df_daily$date <- strftime(df_daily$date, "%Y-%m-%d")

df_daily %>%
  filter(type == "Velo") %>%
  select(date, station, id, count) %>%
  write_csv("StationDailyTimeSeries-Bicycle.csv", na="") 

df_daily %>%
  filter(type == "Fussgänger") %>%
  select(date, station, id, count) %>%
  write_csv("StationDailyTimeSeries-Foot.csv", na="") 

# Compute and save baselines:
# Google: "The baseline is the median value, for the corresponding day of the 
# week, during the 5-week period Jan 3–Feb 6, 2020. 

df_daily %>%
  filter(type == "Velo") %>%
  filter(date >= ymd("2020-01-03") & date <= ymd("2020-02-06")) %>%
  group_by(id) %>%
  summarise(median = median(count)) %>%
  write_csv("StationReference-Bicycle.csv", na="") 

df_daily %>%
  filter(type == "Fussgänger") %>%
  filter(date >= ymd("2020-01-03") & date <= ymd("2020-02-06")) %>%
  group_by(id) %>%
  summarise(median = median(count)) %>%
  write_csv("StationReference-Foot.csv", na="") 

# Derive locations
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Strasse"), "Str.")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("strasse"), "str.")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" (Kraftwerk)"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" (Riehen)"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(", Grenze CH-F"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" lokal (mit Ein-/Ausfahrten)"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" (Rialto)"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" (DB-Brücke)"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Zoll CH-D, "), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("/Kirche"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll(" (von F)"), "")
df_meta$station_name <- str_replace_all(df_meta$station_name, coll("Elisabethenstr. 46*"), "Elisabethenstr. 46")
df_meta$station_name <- str_replace_all(df_meta$station_name, str_c(df_meta$station_id, " "), "")

df_meta <- separate(df_meta, location, c("lat", "lon"), ",")
df_meta$lat <- as.numeric(df_meta$lat)
df_meta$lon <- as.numeric(df_meta$lon)
df_meta$description <- ""

df_meta %>%
  filter(type == "Fussgänger") %>%
  select(station_id, station_name, description, lat, lon) %>%
  write_csv("StationLocations-Foot.csv")

df_meta %>%
  filter(type == "Velo") %>%
  select(station_id, station_name, description, lat, lon) %>%
  write_csv("StationLocations-Bicycle.csv")


library(tidyverse)
library(lubridate)


# Read input data
df <- read_csv("https://data.cityofnewyork.us/api/views/uczf-rk3c/rows.csv?accessType=DOWNLOAD",
               col_types = cols_only("id" = col_character(),
                                     "date" = col_character(),
                                     "counts" = col_integer(),
                                     "status" = col_integer()))

names(df) <- c("station", "date", "count", "status")

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

df_daily %>%
  select(date, station, id, count) %>%
  write_csv("StationDailyTimeSeries-Bicycle.csv", na="") 

# Compute and save baseline:
# Google: "The baseline is the median value, for the corresponding day of the 
# week, during the 5-week period Jan 3–Feb 6, 2020. 

df_daily %>%
  filter(date >= ymd("2020-01-03", tz = "America/New_York") & date <= ymd("2020-02-06", tz = "America/New_York")) %>%
  group_by(id) %>%
  summarise(median = median(count)) %>%
  write_csv("StationReference-Bicycle.csv", na="") 


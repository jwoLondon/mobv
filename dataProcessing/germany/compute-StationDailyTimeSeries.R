library(tidyverse)
library(lubridate)
library(hystReet)


# Read input data
# This will need to loop through all locations
stations <- list('109','170','102','251')
df_total = data.frame()

for (station in stations){
	location <- get_hystreet_station_data(
    	  hystreetId = station, 
    	  query = list(from = "2020-01-01", to = Sys.Date(), resolution = "day"))
	df <- location$measurements

	df$date <- strftime(df$timestamp, "%Y-%m-%d", tz = "Europe/Amsterdam")
	df$dayofweek <- strftime(df$timestamp, "%u", tz = "Europe/Amsterdam")
	df$station <- station
	df$id <- str_c(station, "_", df$dayofweek)

	df <- df[order(df$date),]
	#Select only the columns we need
	df <- df %>% select(date, station, id, pedestrians_count)
	names(df)[names(df) == "pedestrians_count"] <- "count"
	df_total <- rbind(df_total, df)
}

df_total %>%
  select(date, station, id, count) %>%
  write_csv("../../data/germany/StationDailyTimeSeries.csv", na="") 

# Compute and save baseline:
# Google: "The baseline is the median value, for the corresponding day of the 
# week, during the 5-week period Jan 3 - Feb 6, 2020. 

df_total %>%
  filter(date >= ymd("2020-01-03", tz = "Europe/Amsterdam") & date <= ymd("2020-02-06", tz = "Europe/Amsterdam")) %>%
  group_by(id) %>%
  summarise(value = median(count)) %>%
  write_csv("../../data/germany/StationReference.csv", na="")



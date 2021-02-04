library(tidyverse)
library(lubridate)
library(hystReet)

# Read input data
# This loops through all locations
stations <- list('109','170','102','251','118','171','97','94','98','218','163','161','162','253','51','52','87','127','128','129','132','130','131','126','172','248','249','254','103','104','49','246','164','157','53','54','55','56','57','142','125','252','150','58','59','84','143','122','244','243','81','91','92','93','64','65','63','141','139','208','123','247','67','86','48','50','158','167','159','205','47','160','168','144','145','69','68','148','207','85','71','72','95','96','245','100','117','73','74','165','166','88','89','90','210','209','153','108','110','111','114','116','169','147','134','206','75','151','76','77','138','140','255','146','146','79','79','256','154','135')
df_total = data.frame()

for (station in stations){
	tryCatch( { 
		location <- get_hystreet_station_data(
		  hystreetId = station, 
		  query = list(from = "2020-01-01", to = Sys.Date(), resolution = "day"),
		  API_token = Sys.getenv(c("HYSTREET_API_KEY")))
		#Extract the measurement data
		df <- location$measurements
		
		#prepare the variables we need
		df$date <- strftime(df$timestamp, "%Y-%m-%d", tz = "Europe/Amsterdam")
		df$dayofweek <- strftime(df$timestamp, "%u", tz = "Europe/Amsterdam")
		df$station <- station
		df$id <- str_c(station, "_", df$dayofweek)

		df <- df[order(df$date),]
		#Select only the columns we need
		df <- df %>% select(date, station, id, pedestrians_count)
		names(df)[names(df) == "pedestrians_count"] <- "count"
		#make a big data frame with everything	
		df_total <- rbind(df_total, df)
	}
      , warning = function(w) { print("Problem with station") })
}

#output the data to a file for viz
df_total %>%
  select(date, station, id, count) %>%
  write_csv("data/germany/StationDailyTimeSeries.csv", na="") 

# Compute and save baseline:
# Google: "The baseline is the median value, for the corresponding day of the 
# week, during the 5-week period Jan 3 - Feb 6, 2020. 

df_total %>%
  filter(date >= ymd("2020-01-03", tz = "Europe/Amsterdam") & date <= ymd("2020-02-06", tz = "Europe/Amsterdam")) %>%
  group_by(id) %>%
  summarise(value = median(count)) %>%
  write_csv("data/germany/StationReference.csv", na="")



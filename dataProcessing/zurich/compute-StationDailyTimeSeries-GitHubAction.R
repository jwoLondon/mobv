library(tidyverse)
library(lubridate)
library(magrittr)


# Read input data
df <- read_csv("https://data.stadt-zuerich.ch/dataset/83ca481f-275c-417b-9598-3902c481e400/resource/b9308f85-9066-4f5b-8eab-344c790a6982/download/2020_verkehrszaehlungen_werte_fussgaenger_velo.csv", 
               col_types = cols_only(FK_STANDORT = col_character(),
                                     DATUM = col_character(),
                                     VELO_IN = col_integer(),
                                     VELO_OUT = col_integer(),
                                     FUSS_IN = col_integer(),
                                     FUSS_OUT = col_integer()))

names(df) <- c("fk_timelocation", "datetime", "velo_in", "velo_out", "foot_in", "foot_out")
df$datetime <- parse_date_time2(df$datetime, "Y!-m!-*d! H!:M!", tz = "Europe/Berlin")
df$date <- strftime(df$datetime, "%Y-%m-%d")
df$dayofweek <- strftime(df$datetime, "%u")


# Read metadata
df_meta <- read_csv("data/zurich/taz.view_eco_standorte.csv", 
                    col_types = cols_only(abkuerzung = col_character(),
                                          bezeichnung = col_character(), 
                                          id1 = col_character(),
                                          richtung_in = col_character(), 
                                          richtung_out = col_character()))
df_meta <- transmute(df_meta, id_timelocation = id1, 
                              id_location = abkuerzung,
                              name_location = bezeichnung, 
                              direction_in = richtung_in, 
                              direction_out = richtung_out)


# Turn the data frame into long format
df %>%
  filter(!is.na(foot_in)) %>%
  select(-c(velo_in, velo_out)) -> df_foot
df_foot

df %>%
  filter(!is.na(velo_in)) %>%
  select(-c(foot_in, foot_out)) -> df_velo
df_velo

df_foot <- transmute(df_foot, fk_timelocation = fk_timelocation, 
                              datetime = datetime, 
                              date = date, 
                              dayofweek = dayofweek,
                              count_in = foot_in, 
                              count_out = foot_out,
                              mode = "foot")
df_velo <- transmute(df_velo, fk_timelocation = fk_timelocation, 
                              datetime = datetime, 
                              date = date, 
                              dayofweek = dayofweek,
                              count_in = velo_in, 
                              count_out = velo_out,
                              mode = "bicycle")

df = rbind(df_foot, df_velo)
rm(df_foot)
rm(df_velo)

# Join with location table
df %>%
  left_join(df_meta, 
            by = c("fk_timelocation" = "id_timelocation"), 
            suffix = c("", "_y")) %>%
  select(-c(datetime, fk_timelocation, direction_in, direction_out)) -> df

# Handle special cases 

# Merge Langstrasse locations, for walking and cycling
df$id_location[df$id_location %in% c("FZS_LANN", "FZS_LANS")] <- "FZS_LAN*"
df$id_location[df$id_location %in% c("VZS_LANN", "VZS_LANS")] <- "VZS_LAN*"

# Merge Altstetterstrasse, for walking
df$id_location[df$id_location %in% c("FZS_ALTO", "FZS_ALTW")] <- "FZS_ALT*"

# Merge Hardbruecke, for cycling
df$id_location[df$id_location %in% c("VZS_HARN", "VZS_HARS")] <- "VZS_HAR*"

# Merge Limmatquai, for cycling
df$id_location[df$id_location %in% c("VZS_LIMB", "VZS_LIMC")] <- "VZS_LIM*"

# Merge Ohmstrasse, for walking
df$id_location[df$id_location %in% c("FZS_OHMO", "FZS_OHMW")] <- "FZS_OHM*"

# Merge Quaibruecke, for walking
df$id_location[df$id_location %in% c("FZS_QUAN", "FZS_QUAS")] <- "FZS_QUA*"


# Remove disbanded counters at two locations
df <- df %>%
  filter(!(name_location == "Kloster-Fahr-Weg")) %>%
  filter(!(name_location == "Kloster-Fahr-Weg (Europabrücke)")) %>%
  filter(!(name_location == "Fischerweg"))

# Remove counter location with what seems like clearly erroneous data
df <- df %>%
  filter(!(name_location == "Weinbergfussweg"))

# Limmatquai: Set <count_out> to 0
df$count_out[df$name_location == "Limmatquai --> Central"] <- 0
df$count_out[df$name_location == "Limmatquai --> Bellevue"] <- 0

# Hofwiesenstrasse: Set <count_out> to <count_in>
df$count_out[df$name_location == "Hofwiesenstrasse"] <- 
  df$count_in[df$name_location == "Hofwiesenstrasse"]

# Bucheggplatz: Set <count_out> to <count_in>
df$count_out[df$name_location == "Bucheggplatz"] <- 
  df$count_in[df$name_location == "Bucheggplatz"]

# Altstetterstrasse West yields erroneous data for pedestrians between 
# 2020-02-14 and 2020-02-17.
df %>%
  filter(!(name_location == "Altstetterstrasse West" & 
             date >= ymd("2020-02-14") &
             date <= ymd("2020-02-17"))) -> df

# Compute cross-sectional counts
df$count_crosssection = df$count_in + df$count_out

# Compute daily values. Remove days that do not have at least 84 input values 
# (i.e. that have fewer than 21 hours with 4 records each)
df %>%
  filter(!is.na(count_crosssection)) %>%
  group_by(id_location, mode, date, dayofweek) %>%
  summarise(count_crosssection = sum(count_crosssection), n_records = n()) %>%
  filter(n_records >= 84) %>%
  select(date, dayofweek, id_location, mode, count_crosssection) %>%
  ungroup()-> df_daily

df_daily$id <- str_c(df_daily$id_location, "_", df_daily$dayofweek)

head(df_daily)

df_foot <- df_daily %>%
  filter(mode == "foot") %>%
  select(date, id_location, id, count_crosssection)
names(df_foot) <- c("date", "station", "id", "count")

df_bicycle <- df_daily %>%
  filter(mode == "bicycle") %>%
  select(date, id_location, id, count_crosssection)
names(df_bicycle) <- c("date", "station", "id", "count")


df_foot <- df_foot[order(df_foot$date),]
df_bicycle <- df_bicycle[order(df_bicycle$date),]

write_csv(df_foot, "data/zurich/StationDailyTimeSeries-Foot.csv", na="") 
write_csv(df_bicycle, "data/zurich/StationDailyTimeSeries-Bicycle.csv", na="")


# Compute and save baselines:
# Google: "The baseline is the median value, for the corresponding day of the 
# week, during the 5-week period Jan 3–Feb 6, 2020. 

df_foot %>%
  filter(date >= ymd("2020-01-03") & date <= ymd("2020-02-06")) %>%
  group_by(id) %>%
  summarise(value = median(count)) %>%
  write_csv("data/zurich/StationReference-Foot.csv", na="") 


df_bicycle %>%
  filter(date >= ymd("2020-01-03") & date <= ymd("2020-02-06")) %>%
  group_by(id) %>%
  summarise(value = median(count)) %>%
  write_csv("data/zurich/StationReference-Bicycle.csv", na="") 


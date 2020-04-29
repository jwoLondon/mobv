library(tidyverse)
library(magrittr)
library(sf)


df_meta <- read_csv("../../data/zurich/taz.view_eco_standorte.csv", 
                    col_types = cols_only(abkuerzung = col_character(),
                                          bezeichnung = col_character(), 
                                          id1 = col_character(),
                                          richtung_in = col_character(), 
                                          richtung_out = col_character(),
                                          geometry = col_character()))

df_meta <- transmute(df_meta, station_id = abkuerzung,
                              station_name = bezeichnung, 
                              description = "",
                              geometry = geometry)

df_meta$geometry <- st_as_sfc(df_meta$geometry, crs = 2056)
df_meta$geometry_wgs1984 <- st_transform(df_meta$geometry, 4326)
df_meta$lon <- round(st_coordinates(df_meta$geometry_wgs1984)[,1], 6)
df_meta$lat <- round(st_coordinates(df_meta$geometry_wgs1984)[,2], 6)

# Merge Langstrasse locations, for walking and cycling
df_meta$station_id[df_meta$station_id %in% c("FZS_LANN", "FZS_LANS")] <- "FZS_LAN*"
df_meta$station_id[df_meta$station_id %in% c("VZS_LANN", "VZS_LANS")] <- "VZS_LAN*"
df_meta$station_name[df_meta$station_name %in% c("Langstrasse (Unterführung Nord)", "Langstrasse (Unterführung Süd)")] <- "Langstrasse"

# Merge Altstetterstrasse, for walking
df_meta$station_id[df_meta$station_id %in% c("FZS_ALTO", "FZS_ALTW")] <- "FZS_ALT*"
df_meta$station_name[df_meta$station_name %in% c("Altstetterstrasse Ost", "Altstetterstrasse West")] <- "Altstetterstrasse"

# Merge Hardbruecke, for cycling
df_meta$station_id[df_meta$station_id %in% c("VZS_HARN", "VZS_HARS")] <- "VZS_HAR*"
df_meta$station_name[df_meta$station_name %in% c("Hardbrücke Nord (Seite Altstetten)", "Hardbrücke Süd (Seite HB)")] <- "Hardbrücke"

# Merge Limmatquai, for cycling
df_meta$station_id[df_meta$station_id %in% c("VZS_LIMB", "VZS_LIMC")] <- "VZS_LIM*"
df_meta$station_name[df_meta$station_name %in% c("Limmatquai --> Bellevue", "Limmatquai --> Central")] <- "Limmatquai"

# Merge Ohmstrasse, for walking
df_meta$station_id[df_meta$station_id %in% c("FZS_OHMO", "FZS_OHMW")] <- "FZS_OHM*"
df_meta$station_name[df_meta$station_name %in% c("Ohmstrasse Ost", "Ohmstrasse West")] <- "Ohmstrasse"

# Merge Quaibruecke, for walking
df_meta$station_id[df_meta$station_id %in% c("FZS_QUAN", "FZS_QUAS")] <- "FZS_QUA*"
df_meta$station_name[df_meta$station_name %in% c("Quaibrücke Nord (Limmatseite)", "Quaibrücke Süd (Seeseite)")] <- "Quaibrücke"

# Rename station Lettenviadukt (Limmatstr.)
df_meta$station_name[df_meta$station_name == "Lettenviadukt (Limmatstr.)"] <- "Lettenviadukt"

# Remove disbanded counters at two locations
df_meta <- df_meta %>%
  filter(!(station_name == "Kloster-Fahr-Weg")) %>%
  filter(!(station_name == "Kloster-Fahr-Weg (Europabrücke)")) %>%
  filter(!(station_name == "Fischerweg")) %>%
  filter(!(station_name == "Weinbergfussweg")) %>%
  filter(!(station_name == "In Gassen"))

df_meta %>%
  filter(station_id %in% c("VZS_SAUM", "VZS_LAN*", "VZS_HAR*", "VZS_BINZ", 
                           "VZS_BUCH", "VZS_KLOW", "VZS_HOFW", "VZS_LIM*", 
                           "VZS_LUXG", "VZS_MILI", "VZS_MYTH", "VZS_MUEH", 
                           "VZS_ZOLL", "VZS_TOED", "VZS_TALS", "VZS_SCHU", 
                           "VZS_ANDR", "VZS_SIHL", "VZS_BERT", "VZS_FISC", 
                           "VZS_SCHE")) %>%
  select(station_id, station_name, description, lat, lon) %>%
  group_by(station_id, station_name, description) %>%
  summarise(lat = mean(lat), lon = mean(lon)) %>%
  ungroup() %>%
  distinct() %>% 
  write_csv("../../data/zurich/StationLocations-Bicycle.csv")

df_meta %>%
  filter(station_id %in% c("FZS_LETL", "FZS_MYTH", "FZS_ARBO", "FZS_HARD", 
                           "FZS_ALT*", "FZS_KATZ", "FZS_QUA*", "FZS_CASS", 
                           "FZS_CHOR", "FZS_LETD", "FZS_OHM*", "FZS_WEIN", 
                           "FZS_LAN*", "FZS_LIMM", "FZS_MILI", "FZS_ZEHN", 
                           "FZS_KLOE")) %>%
  select(station_id, station_name, description, lat, lon) %>%
  group_by(station_id, station_name, description) %>%
  summarise(lat = mean(lat), lon = mean(lon)) %>%
  ungroup() %>%
  distinct() %>% 
  write_csv("../../data/zurich/StationLocations-Foot.csv")


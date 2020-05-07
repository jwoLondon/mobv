# Data Sources

## 1. Station Regions

"Stations" are local aggregations of TfL/Santander public bicycle hire docking stations _powered by TfL Open Data, containing OS data © Crown copyright and database rights 2020' and Geomni UK Map data © and database rights 2020._

Original docking station locations available from [TFL BikePoint API](https://api.tfl.gov.uk/swagger/ui/index.html?url=/swagger/docs/v1#!/BikePoint/BikePoint_GetAll), aggregations based on 'village' locations of docking stations with additional merging and reallocation as follows:

### 1.1 Naming Consistency & Abbreviation

    Kings Cross -> King's Cross
    Parsons Green -> Parson's Green
    Queen Elizabeth Olympic Park -> Olympic Park
    St. James's -> St James's
    St. John's Wood -> St John's Wood
    St.John's Wood -> St John's Wood
    St Lukes -> St Luke's
    St. Luke's -> St Luke's
    St. Paul's -> St Paul's
    The Borough -> Borough
    The Regent's Park -> Regent's Park

### 1.2 Aggregation

    302, Putney Pier, Wandsworth -> Putney
    728, Putney Bridge Road, East Putney -> Putney
    704, Mexfield Road, East Putney -> Wandsworth
    719, Victoria Park Road, Hackney Central -> Victoria Park
    718, Ada Street, Hackney Central -> Haggerston
    783, Monier Road,Hackney Wick -> Olympic Park
    790, Stratford Station, Olympic Park -> Olympic Park
    768, Clapham Common North Side, Clapham Common -> Clapham
    637, Spencer Park, Wandsworth Common -> Clapham
    675, Usk Road, Clapham Junction -> Wandsworth
    689, Spanish Road, Clapham Junction -> Wandsworth
    653, Simpson Street, Clapham -> Battersea
    706, Snowsfields, London Bridge -> Bermondsey
    732, Duke Street Hill, London Bridge -> Borough
    748, Hertford Road, De Beauvoir Town -> Haggerston
    487, Canton Street, Poplar -> Limehouse
    120, The Guildhall, Guildhall -> Bank
    127, Wood Street, Guildhall -> Bank
    509, Fore Street, Guildhall -> Bank
    838, Fore Street Avenue, Guildhall -> Bank
    199, Great Tower Street, Monument -> Bank
    276, Lower Thames Street, Monument -> Bank
    587, Monument Street, Monument -> Bank
    423, Eaton Square (South), Belgravia -> Knightsbridge
    181, Belgrave Square, Belgravia -> Knightsbridge
    207, Grosvenor Crescent, Belgravia -> Knightsbridge
    634, Brook Green South, Brook Green -> Hammersmith
    775, Little Brook Green, Brook Green -> Hammersmith
    393, Snow Hill, Farringdon -> Holborn
    203, West Smithfield Rotunda, Farringdon -> Barbican
    527, Hansard Mews, Holland Park -> Shepherd's Bush
    559, Abbotsbury Road, Holland Park -> Kensington
    611, Princedale Road, Holland Park -> Ladbroke Grove
    606, Addison Road, Holland Park -> Ladbroke Grove
    612, Wandsworth Rd, Isley Court -> Wandsworth Road
    224, Queensway, Kensington Gardens -> Hyde Park
    307, Black Lion Gate, Kensington Gardens -> Hyde Park
    350, Queen's Gate, Kensington Gardens -> Hyde Park
    404, Palace Gate, Kensington Gardens -> Hyde Park
    8, Maida Vale, Maida Vale -> St John's Wood
    47, Warwick Avenue Station, Maida Vale -> St John's Wood
    255, Clifton Road, Maida Vale -> St John's Wood
    140, Finsbury Square, Moorgate -> Liverpool Street
    215, Moorfields, Moorgate -> Barbican
    331, Bunhill Row, Moorgate -> Barbican
    631, Battersea Park Road, Nine Elms -> Battersea Park
    183, Riverlight North, Nine Elms -> Pimlico
    817, Riverlight South, Nine Elms -> Pimlico
    650, St. Mark's Road, North Kensington -> Portobello
    807, Bevington Road West, North Kensington -> Portobello
    149, Kennington Road Post Office, Oval -> Kennington
    440, Kennington Oval, Oval -> Kennington
    654, Ashmole Estate, Oval -> Kennington
    298, Curlew Street, Shad Thames -> Bermondsey
    5, Sedding Street, Sloane Square -> Knightsbridge
    25, Doric Way, Somers Town -> Euston
    797, Ossulston Street, Somers Town -> Euston
    80, Webber Street, Southwark -> Elephant & Castle
    160, Waterloo Place, St James's -> West End
    228, St. James's Square, St James's -> West End
    116, Little Argyll Street, West End -> Soho
    79, Arundel Street, Temple -> Strand
    27, Bouverie Street, Temple -> Holborn
    773, Tallis Street, Temple -> St Paul's
    452, St. Katharine's Way, Tower -> Wapping
    104, Crosswall, Tower -> Aldgate
    130, Tower Gardens, Tower -> Aldgate
    739, Hortensia Road, West Brompton -> West Chelsea
    757, Harcourt Terrace, West Brompton -> Earl's Court
    566, Westfield Ariel Way, White City -> Avondale
    601, BBC White City, White City -> Avondale
    124,Eaton Square, Belgravia -> Knightsbridge
    259, Bourne Street, Belgravia -> Pimlico

## 2. Bicycle Activity

Bicycle activity derived by calculating the change in docked bicycles every 10 minutes. Each region's daily activity is the sum of absolute changes in docked bikes over a 24 hour (midnight to midnight) period for each docking station within the region. Docked bicycles extracted via the [TFL BikePoint API](https://api.tfl.gov.uk/swagger/ui/index.html?url=/swagger/docs/v1#!/BikePoint/BikePoint_GetAll).

## 3. Map Data

Map data (River Thames and Parks) derived from [Open Street Map](https://www.openstreetmap.org/copyright).

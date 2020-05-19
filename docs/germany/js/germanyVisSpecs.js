// DATA SOURCES

let path = "https://jwolondon.github.io/mobv/data/germany/";

let footStationData = path + "StationLocationsSelection.csv";
let footTimeSeriesData = path + "StationDailyTimeSeries.csv";
let footReferenceData = path + "StationReference.csv";

let annotationsData = path + "annotations.csv";

let boundaries = path + "geo/bundeslaender.json";
let boundaryFeature = "bundeslaender";

// CHART SCALING

let footAnomalyMax = 350;
let footAnomalyMin = -350;

// INTERACTIVE MAP SPECIFICATION (CURRENTLY GERMANY AND LONDON ONLY)

let regionData = path + "geo/bundeslaender.json";
let regionFeature = "bundeslaender";
let stationRegionData = path + "StationRegions.csv";
let stationLocationData = path + "StationLocations.csv";
let regionCentroidData = path + "geo/bundeslaenderCentroids.csv";
let yesterday = Math.floor(Date.now() / 86400000 - 1) * 86400000;

// Stations aggregated by Bundeslaender will regress to mean, so lower the range.
let mapAnomalyMax = 250;
let mapAnomalyMin = -250;

// -----------------------------------------------------------------------------

// PEDESTRIAN LINKED VIEWS CHART

let vlSpecLinkedFoot = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  spacing: 0,
  padding: {
    left: 10,
    top: 0,
    right: 0,
    bottom: 0,
  },
  data: { url: `${footTimeSeriesData}` },
  transform: [
    {
      lookup: "id",
      from: {
        data: { url: `${footReferenceData}` },
        key: "id",
        fields: ["value"],
      },
    },
    {
      calculate:
        "datum.value == 0 ? 0 : (datum.count - datum.value)/sqrt(datum.value)",
      as: "anomaly",
    },
    {
      lookup: "station",
      from: {
        data: { url: `${footStationData}` },
        key: "station_id",
        fields: ["station_name"],
      },
    },
    {
      filter: "datum.station_name != null",
    },
  ],
  hconcat: [
    {
      vconcat: [
        {
          width: 800,
          height: {
            step: 11,
          },
          layer: [
            {
              selection: {
                brush: {
                  type: "multi",
                  fields: ["station_name"],
                },
              },
              encoding: {
                x: {
                  field: "date",
                  type: "temporal",
                  axis: {
                    gridOpacity: {
                      condition: {
                        test: "day(datum.value) == 6 || day(datum.value) == 0",
                        value: 1,
                      },
                      value: 0,
                    },
                    tickSize: {
                      condition: {
                        test: "day(datum.value) == 1",
                        value: 6,
                      },
                      value: 3,
                    },
                    tickCount: 100,
                    gridWidth: 8,
                    gridColor: "#f6f6f6",
                    labelExpr:
                      "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
                    title: "",
                    labelFont: "Roboto Condensed",
                  },
                },
                y: {
                  field: "station_name",
                  type: "nominal",
                  sort: {
                    field: "count",
                    op: "mean",
                    order: "descending",
                  },
                  axis: {
                    title: "",
                    offset: 7,
                    labelFont: "Roboto Condensed",
                    domain: false,
                    ticks: false,
                  },
                },
                color: {
                  field: "anomaly",
                  type: "quantitative",
                  scale: {
                    scheme: "blueOrange",
                    domainMid: 0,
                  },
                  legend: {
                    title: "Anomaly",
                    direction: "horizontal",
                    orient: "top",
                    gradientThickness: 8,
                  },
                },
                opacity: {
                  condition: {
                    selection: "brush",
                    value: 1,
                  },
                  value: 0.5,
                },
                size: {
                  condition: {
                    selection: "brush",
                    value: 90,
                  },
                  value: 40,
                },
                tooltip: [
                  {
                    field: "station_name",
                    type: "nominal",
                    title: "locality",
                  },
                  {
                    field: "date",
                    type: "temporal",
                    format: "%a %e %b",
                  },
                  {
                    field: "value",
                    type: "quantitative",
                    title: "expected",
                    format: ".0f",
                  },
                  {
                    field: "count",
                    type: "quantitative",
                    title: "observed",
                  },
                  {
                    field: "anomaly",
                    type: "quantitative",
                    format: ".1f",
                  },
                ],
              },
              mark: "square",
            },
            {
              data: { url: `${annotationsData}` },
              layer: [
                {
                  encoding: {
                    x: {
                      field: "date",
                      type: "temporal",
                    },
                  },
                  mark: {
                    type: "rule",
                    strokeDash: [4, 2],
                    opacity: 0.5,
                  },
                },
                {
                  encoding: {
                    x: {
                      field: "date",
                      type: "temporal",
                    },
                    y: {
                      value: 0,
                    },
                    text: {
                      field: "notes",
                      type: "nominal",
                    },
                  },
                  mark: {
                    type: "text",
                    angle: 310,
                    align: "left",
                    opacity: 0.5,
                    fontSize: 8,
                    font: "Roboto Condensed",
                    dx: 2,
                  },
                },
              ],
            },
          ],
        },
        {
          width: 800,
          height: 400,
          layer: [
            {
              selection: {
                brush: {
                  type: "multi",
                  fields: ["station_name"],
                },
              },
              encoding: {
                x: {
                  field: "date",
                  type: "temporal",
                  axis: {
                    gridOpacity: {
                      condition: {
                        test: "day(datum.value) == 6 || day(datum.value) == 0",
                        value: 1,
                      },
                      value: 0,
                    },
                    tickSize: {
                      condition: {
                        test: "day(datum.value) == 1",
                        value: 6,
                      },
                      value: 3,
                    },
                    tickCount: 100,
                    gridWidth: 8,
                    gridColor: "#f6f6f6",
                    labelExpr:
                      "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
                    title: "",
                    labelFont: "Roboto Condensed",
                  },
                },
                y: {
                  field: "anomaly",
                  type: "quantitative",
                  scale: {
                    domain: [`${footAnomalyMin}`, `${footAnomalyMax}`],
                    nice: false,
                  },
                  title: "Anomaly",
                  labelFont: "Roboto Condensed",
                },
                color: {
                  condition: {
                    selection: "brush",
                    field: "station_name",
                    type: "nominal",
                    legend: null,
                  },
                  value: "black",
                },
                opacity: {
                  condition: {
                    selection: "brush",
                    value: 1,
                  },
                  value: 0.1,
                },
                size: {
                  condition: {
                    selection: "brush",
                    value: 2,
                  },
                  value: 0.2,
                },
              },
              mark: {
                type: "line",
                interpolate: "monotone",
                clip: true,
              },
            },
            {
              data: {
                values: [
                  {
                    origin: 0,
                  },
                ],
              },
              encoding: {
                y: {
                  field: "origin",
                  type: "quantitative",
                },
              },
              mark: "rule",
            },
            {
              data: { url: `${annotationsData}` },
              encoding: {
                x: {
                  field: "date",
                  type: "temporal",
                },
              },
              mark: {
                type: "rule",
                strokeDash: [4, 2],
                opacity: 0.5,
              },
            },
          ],
        },
      ],
    },
    {
      width: 800,
      height: 1000,
      transform: [
        {
          aggregate: [
            {
              op: "count",
              field: "station_name",
              as: "numReadings",
            },
          ],
          groupby: ["station_name"],
        },
        {
          lookup: "station_name",
          from: {
            data: { url: `${footStationData}` },
            key: "station_name",
            fields: ["lon", "lat"],
          },
        },
      ],
      layer: [
        {
          data: {
            url: `${boundaries}`,
            format: {
              type: "topojson",
              feature: `${boundaryFeature}`,
            },
          },
          mark: {
            type: "geoshape",
            fill: "rgb(252,246,229)",
            stroke: "white",
            fillOpacity: 0.8,
            strokeWidth: 4,
          },
        },
        {
          selection: {
            brush: {
              type: "multi",
              fields: ["station_name"],
            },
          },
          encoding: {
            longitude: {
              field: "lon",
              type: "quantitative",
            },
            latitude: {
              field: "lat",
              type: "quantitative",
            },
            color: {
              field: "station_name",
              type: "nominal",
              legend: null,
            },
            opacity: {
              condition: {
                selection: "brush",
                value: 1,
              },
              value: 0.1,
            },
          },
          mark: {
            type: "square",
            size: 80,
          },
        },
        {
          encoding: {
            longitude: {
              field: "lon",
              type: "quantitative",
            },
            latitude: {
              field: "lat",
              type: "quantitative",
            },
            text: {
              field: "station_name",
              type: "nominal",
            },
            opacity: {
              condition: {
                selection: "brush",
                value: 1,
              },
              value: 0.1,
            },
          },
          mark: {
            type: "text",
            dy: 10,
            fontSize: 6,
            font: "Roboto Condensed",
          },
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------

let vlSpecMap = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 800,
  height: 1000,
  layer: [
    {
      data: {
        url: `${regionData}`,
        format: { type: "topojson", feature: `${regionFeature}` },
      },
      mark: {
        type: "geoshape",
        fill: "#eee",
        stroke: "black",
        strokeWidth: 0.5,
      },
    },
    {
      data: { url: `${footTimeSeriesData}` },
      selection: {
        mySelection: {
          type: "single",
          fields: ["date"],
          init: {
            date: 1577836800000,
          },
          bind: {
            date: {
              input: "range",
              name: "date",
              min: 1577836800000,
              max: `${yesterday}`,
              step: 86400000,
            },
          },
        },
      },
      transform: [
        {
          filter: "datum.date == mySelection_date",
        },
        {
          lookup: "station",
          from: {
            data: { url: `${stationLocationData}` },
            key: "station_id",
            fields: ["station_name"],
          },
        },
        {
          lookup: "station",
          from: {
            data: { url: `${stationRegionData}` },
            key: "station_id",
            fields: ["bundeslaender"],
          },
        },
        {
          lookup: "id",
          from: {
            data: { url: `${footReferenceData}` },
            key: "id",
            fields: ["value"],
          },
        },
        {
          calculate:
            "datum.value == 0 ? 0 : (datum.count - datum.value)/sqrt(datum.value)",
          as: "anomaly",
        },
        {
          aggregate: [
            {
              op: "mean",
              field: "anomaly",
              as: "avAnomaly",
            },
          ],
          groupby: ["bundeslaender"],
        },
        {
          lookup: "bundeslaender",
          from: {
            data: {
              url: `${regionData}`,
              format: { type: "topojson", feature: `${regionFeature}` },
            },
            key: "properties.NAME_1",
          },
          as: "geo",
        },
      ],
      encoding: {
        shape: {
          field: "geo",
          type: "geojson",
        },
        color: {
          field: "avAnomaly",
          type: "quantitative",
          scale: {
            scheme: "blueOrange",
            domainMid: 0,
            domain: [-250, 250],
            nice: false,
          },
          legend: {
            title: "Anomaly",
            direction: "horizontal",
            orient: "none",
            legendX: 20,
            legendY: 100,
            gradientLength: 200,
            offset: 105,
            gradientThickness: 12,
          },
        },
        tooltip: [
          {
            field: "bundeslaender",
            type: "nominal",
            title: "Bundeslaender",
          },
          {
            field: "avAnomaly",
            type: "quantitative",
            format: ".1f",
          },
        ],
      },
      mark: {
        type: "geoshape",
        stroke: "black",
        strokeWidth: 2,
      },
    },
    {
      data: { url: `${regionCentroidData}` },
      encoding: {
        longitude: {
          field: "longitude",
          type: "quantitative",
        },
        latitude: {
          field: "latitude",
          type: "quantitative",
        },
        text: {
          field: "NAME_1",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        fontSize: 8,
        font: "Roboto Condensed",
        opacity: 0.6,
      },
    },
    {
      data: { url: `${footTimeSeriesData}` },
      transform: [
        {
          filter: "datum.station == 73",
        },
        {
          filter: "datum.date == mySelection_date",
        },
      ],
      encoding: {
        x: {
          value: 20,
        },
        y: {
          value: 40,
        },
        text: {
          field: "date",
          type: "temporal",
          format: "%a %e %B",
        },
      },
      mark: {
        type: "text",
        font: "Fjalla One",
        fontSize: 32,
        align: "left",
      },
    },
    {
      data: { url: `${annotationsData}` },
      transform: [
        {
          filter: "time(datum.date) == mySelection_date",
        },
      ],
      encoding: {
        x: {
          value: 20,
        },
        y: {
          value: 70,
        },
        text: {
          field: "notes",
          type: "nominal",
        },
      },
      mark: {
        type: "text",
        font: "Roboto Condensed",
        fontSize: 18,
        align: "left",
      },
    },
  ],
};

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#visLinkedFoot", vlSpecLinkedFoot).catch(console.error);
vegaEmbed("#visMap", vlSpecMap).catch(console.error);

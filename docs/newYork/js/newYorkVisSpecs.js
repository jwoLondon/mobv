// DATA SOURCES

let path = "https://jwolondon.github.io/mobv/data/zurich/";

let bicycleStationData = path + "StationLocations-Bicycle.csv";
let bicycleTimeSeriesData = path + "StationDailyTimeSeries-Bicycle.csv";
let bicycleReferenceData = path + "StationReference-Bicycle.csv";

let annotationsData = path + "annotations.csv";

let greyLines = path + "geo/NYmainRoads.json";
let greyLineFeature = "mainRoads";
let greenPolys = path + "geo/NYparks.json";
let greenPolyFeature = "parks";

// CHART SCALING

let bicycleAnomalyMax = 120;
let bicycleAnomalyMin = -120;

// -----------------------------------------------------------------------------

// BICYCLE LINKED VIEWS CHART

let vlSpecLinkedBicycle = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  spacing: 0,
  center: false,
  concat: [
    {
      columns: 1,
      concat: [
        {
          width: 800,
          height: {
            step: 15,
          },
          layer: [
            {
              data: { url: `${bicycleTimeSeriesData}` },
              transform: [
                {
                  lookup: "id",
                  from: {
                    data: { url: `${bicycleReferenceData}` },
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
                    data: { url: `${bicycleStationData}` },
                    key: "station_id",
                    fields: ["station_name"],
                  },
                },
              ],
              selection: {
                brush: {
                  type: "multi",
                  encodings: ["y"],
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
                    tickCount: 100,
                    gridWidth: 8,
                    gridColor: "#f6f6f6",
                    labelExpr:
                      "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
                    title: "",
                  },
                },
                y: {
                  field: "station_name",
                  type: "nominal",
                  sort: {
                    field: "count",
                    op: "sum",
                    order: "descending",
                  },
                  axis: {
                    title: "",
                    offset: 7,
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
                  },
                  {
                    field: "date",
                    type: "temporal",
                    format: "%a %e %b %Y",
                  },
                  {
                    field: "count",
                    type: "quantitative",
                  },
                  {
                    field: "value",
                    type: "quantitative",
                  },
                  {
                    field: "anomaly",
                    type: "quantitative",
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
                    dx: 2,
                  },
                },
              ],
            },
          ],
        },
        {
          width: 800,
          height: 350,
          layer: [
            {
              data: { url: `${bicycleTimeSeriesData}` },
              transform: [
                {
                  lookup: "id",
                  from: {
                    data: { url: `${bicycleReferenceData}` },
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
                    data: { url: `${bicycleStationData}` },
                    key: "station_id",
                    fields: ["station_name"],
                  },
                },
              ],
              selection: {
                brush: {
                  type: "multi",
                  encodings: ["y"],
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
                    tickCount: 100,
                    gridWidth: 8,
                    gridColor: "#f6f6f6",
                    labelExpr:
                      "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
                    title: "",
                  },
                },
                y: {
                  field: "anomaly",
                  type: "quantitative",
                  scale: {
                    domain: [`${bicycleAnomalyMin}`, `${bicycleAnomalyMax}`],
                    nice: false,
                  },
                  title: "Anomaly",
                },
                color: {
                  condition: {
                    selection: "brush",
                    field: "station_name",
                    type: "nominal",
                    legend: {
                      title: null,
                      columns: 2,
                      orient: "top-left",
                    },
                    sort: {
                      field: "count",
                      op: "sum",
                      order: "descending",
                    },
                  },
                  value: "black",
                },
                opacity: {
                  condition: {
                    selection: "brush",
                    value: 1,
                  },
                  value: 0.2,
                },
                size: {
                  condition: {
                    selection: "brush",
                    value: 1.5,
                  },
                  value: 0.3,
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
      height: 700,
      layer: [
        {
          data: {
            url: `${greyLines}`,
            format: { type: "topojson", feature: `${greyLineFeature}` },
          },
          mark: {
            type: "geoshape",
            color: "rgb(226,226,226)",
            strokeWidth: 4,
            filled: false,
          },
        },
        {
          data: {
            url: `${greenPolys}`,
            format: {
              type: "topojson",
              feature: `${greenPolyFeature}`,
            },
          },
          mark: {
            type: "geoshape",
            color: "rgb(239,244,225)",
          },
        },
        {
          data: { url: `${bicycleStationData}` },
          encoding: {
            longitude: {
              field: "lon",
              type: "quantitative",
            },
            latitude: {
              field: "lat",
              type: "quantitative",
            },
          },
          transform: [
            {
              filter: {
                selection: "brush",
              },
            },
          ],
          mark: "circle",
        },
        {
          data: { url: `${bicycleStationData}` },
          transform: [
            {
              filter: {
                selection: "brush",
              },
            },
          ],
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
          },
          mark: {
            type: "text",
            align: "left",
            dx: 4,
            opacity: 0.3,
            fontSize: 8,
          },
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#visLinkedBicycle", vlSpecLinkedBicycle).catch(console.error);

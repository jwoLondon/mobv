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

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------

// FOOT LINKED VIEWS CHART

let vlSpecLinkedFoot = {
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
            step: 12,
          },
          layer: [
            {
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
                    format: ".0f",
                    title: "expected",
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
                    domain: [`${footAnomalyMin}`, `${footAnomalyMax}`],
                    nice: false,
                  },
                  title: "Anomaly",
                },
                color: {
                  condition: {
                    selection: "brush",
                    field: "station_name",
                    type: "nominal",
                    legend: null,
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
      height: 900,
      layer: [
        {
          data: {
            url:
              "https://jwolondon.github.io/mobv/data/germany/geo/bundeslaender.json",
            format: { type: "topojson", feature: "bundeslaender" },
          },
          mark: {
            type: "geoshape",
            stroke: "white",
            fill: "rgb(252,246,229)",
            fillOpacity: 0.8,
            strokeWidth: 4,
          },
        },
        {
          data: {
            url:
              "https://jwolondon.github.io/mobv/data/germany/StationLocationsSelection.csv",
          },
          encoding: {
            longitude: { field: "lon", type: "quantitative" },
            latitude: { field: "lat", type: "quantitative" },
          },
          transform: [{ filter: { selection: "brush" } }],
          mark: "circle",
        },
        {
          data: {
            url:
              "https://jwolondon.github.io/mobv/data/germany/StationLocationsSelection.csv",
          },
          transform: [{ filter: { selection: "brush" } }],
          encoding: {
            longitude: { field: "lon", type: "quantitative" },
            latitude: { field: "lat", type: "quantitative" },
            text: { field: "station_name", type: "nominal" },
          },
          mark: {
            type: "text",
            align: "left",
            dx: 4,
            opacity: 0.6,
            fontSize: 8,
          },
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#visLinkedFoot", vlSpecLinkedFoot).catch(console.error);

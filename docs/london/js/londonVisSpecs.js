// DATA SOURCES

let path = "https://jwolondon.github.io/mobv/data/london/";

let bicycleStationData = path + "stationLocations-Bicycle.csv";
let bicycleTimeSeriesData = path + "StationDailyTimeSeries-Bicycle.csv";
let bicycleReferenceData = path + "StationReference-Bicycle.csv";

let annotationsData = path + "annotations.csv";

let bluePolys = path + "geo/thames.json";
let bluePolyFeature = "thames";
let greenPolys = path + "geo/parks.json";
let greenPolyFeature = "parks";

// CHART SCALING

let bicycleAnomalyMax = 50;
let bicycleAnomalyMin = -50;

// INTERACTIVE MAP SPECIFICATION (CURRENTLY LONDON ONLY)

let localityData = path + "geo/localities.json";
let localityFeature = "localities";
let localityCentroidData = path + "geo/localityCentroids.csv";
let thamesData = path + "geo/thamesSimplified.json";
let thamesFeature = "thames";
let yesterday = Math.floor(Date.now() / 86400000 - 1) * 86400000;

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
  padding: {
    left: 10,
    top: 0,
    right: 0,
    bottom: 0,
  },
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
    {
      filter: "datum.station_name != null",
    },
  ],
  vconcat: [
    {
      width: 1000,
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
                domain: false,
                ticks: false,
                labelFont: "Roboto Condensed",
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
                value: 60,
              },
              value: 60,
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
      width: 1000,
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
                domain: [`${bicycleAnomalyMin}`, `${bicycleAnomalyMax}`],
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
    {
      width: 1000,
      height: 810,
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
            data: { url: `${bicycleStationData}` },
            key: "station_name",
            fields: ["lon", "lat"],
          },
        },
      ],
      layer: [
        {
          data: {
            url: `${bluePolys}`,
            format: { type: "topojson", feature: `${bluePolyFeature}` },
          },
          mark: {
            type: "geoshape",
            color: "rgb(228,236,246)",
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
            fontSize: 10,
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
  background: "rgb(252,246,229)",
  width: 835,
  height: 525,
  layer: [
    {
      data: { url: `${bicycleTimeSeriesData}` },
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
          lookup: "station",
          from: {
            data: {
              url: `${localityData}`,
              format: { type: "topojson", feature: `${localityFeature}` },
            },
            key: "properties.name",
          },
          as: "geo",
        },
        {
          filter: "datum.date == mySelection_date",
        },
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
      ],
      encoding: {
        shape: {
          field: "geo",
          type: "geojson",
        },
        color: {
          field: "anomaly",
          type: "quantitative",
          scale: {
            scheme: "blueOrange",
            domainMid: 0,
            domain: [-50, 50],
            nice: false,
          },
          legend: {
            title: "Anomaly",
            direction: "horizontal",
            orient: "bottom-right",
            offset: 40,
            gradientThickness: 12,
          },
        },
        tooltip: [
          {
            field: "station",
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
          },
          {
            field: "count",
            type: "quantitative",
            title: "observed",
            format: ".0f",
          },
          {
            field: "anomaly",
            type: "quantitative",
            format: ".1f",
          },
        ],
      },
      mark: {
        type: "geoshape",
        stroke: "white",
        strokeWidth: 2,
      },
    },
    {
      data: {
        url: `${thamesData}`,
        format: { type: "topojson", feature: `${thamesFeature}` },
      },
      mark: {
        type: "geoshape",
        stroke: "white",
        strokeWidth: 10,
        strokeJoin: "round",
        strokeCap: "round",
        filled: false,
      },
    },
    {
      data: { url: `${localityCentroidData}` },
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
          field: "name",
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
      data: { url: `${bicycleTimeSeriesData}` },
      transform: [
        {
          filter: "datum.station == 'Marylebone'",
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

vegaEmbed("#visLinkedBicycle", vlSpecLinkedBicycle).catch(console.error);
vegaEmbed("#visMap", vlSpecMap).catch(console.error);

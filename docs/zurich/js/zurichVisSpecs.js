// DATA SOURCES

let path = "https://jwolondon.github.io/mobv/data/zurich/";

let bicycleStationData = path + "StationLocations-Bicycle.csv";
let bicycleTimeSeriesData = path + "StationDailyTimeSeries-Bicycle.csv";
let bicycleReferenceData = path + "StationReference-Bicycle.csv";

let footStationData = path + "StationLocations-Foot.csv";
let footTimeSeriesData = path + "StationDailyTimeSeries-Foot.csv";
let footReferenceData = path + "StationReference-Foot.csv";

let annotationsData = path + "annotations.csv";

let blueLines = path + "geo/zurichRivers.json";
let blueLineFeature = "zurichLines";
let bluePolys = path + "geo/zurichLakes.json";
let bluePolyFeature = "zurichPolys";
let greenPolys = path + "geo/zurichGreen.json";
let greenPolyFeature = "zurichPolys";

// CHART SCALING

let bicycleAnomalyMax = 120;
let bicycleAnomalyMin = -120;
let footAnomalyMax = 140;
let footAnomalyMin = -140;

// BICYCLE COUNTS AS PROPORTIONAL CIRCLES

let vlSpec2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  height: 1400,
  data: { url: `${bicycleTimeSeriesData}` },
  transform: [
    {
      lookup: "station",
      from: {
        data: { url: `${bicycleStationData}` },
        key: "station_id",
        fields: ["station_name"],
      },
    },
  ],
  encoding: {
    x: {
      field: "station_name",
      type: "nominal",
      sort: {
        field: "count",
        op: "sum",
        order: "descending",
      },
      title: "",
    },
    y: {
      field: "date",
      type: "temporal",
      axis: {
        title: "",
        grid: false,
      },
    },
    size: {
      field: "count",
      type: "quantitative",
    },
  },
  mark: "circle",
};

// -----------------------------------------------------------------------------

// FOOT COUNTS AS PROPROPORTIONAL CIRCLES

let vlSpec3 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  height: 1400,
  data: { url: `${footTimeSeriesData}` },
  transform: [
    {
      lookup: "station",
      from: {
        data: { url: `${footStationData}` },
        key: "station_id",
        fields: ["station_name"],
      },
    },
  ],
  encoding: {
    x: {
      field: "station_name",
      type: "nominal",
      sort: {
        field: "count",
        op: "sum",
        order: "descending",
      },
      title: "",
    },
    y: {
      field: "date",
      type: "temporal",
      axis: {
        title: "",
        grid: false,
      },
    },
    size: {
      field: "count",
      type: "quantitative",
    },
  },
  mark: "circle",
};

// -----------------------------------------------------------------------------

// BICYCLE GRID VIEW

let vlSpec4 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  height: 1400,
  data: { url: `${bicycleTimeSeriesData}` },
  transform: [
    {
      lookup: "id",
      from: {
        data: { url: `${bicycleReferenceData}` },
        key: "id",
        fields: ["median"],
      },
    },
    {
      calculate:
        "datum.median == 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
  encoding: {
    x: {
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
    y: {
      field: "date",
      type: "temporal",
      axis: {
        title: "",
        grid: false,
        tickCount: 100,
        ticks: false,
        labelFontWeight: {
          condition: {
            test: "day(datum.value) == 6 || day(datum.value) == 0",
            value: "bold",
          },
          value: "normal",
        },
        labelFontSize: {
          condition: {
            test: "day(datum.value) == 6 || day(datum.value) == 0",
            value: 9,
          },
          value: 7,
        },
        labelExpr:
          "timeFormat(datum.value, '%e') == ' 1' ? timeFormat(datum.value, '%B %e') : timeFormat(datum.value, '%a %e')",
      },
    },
    color: {
      field: "anomaly",
      type: "quantitative",
      scale: {
        scheme: "blueOrange",
        domainMid: 0,
      },
      title: "Anomaly",
    },
    strokeWidth: {
      condition: {
        test: "day(datum.date) == 6 || day(datum.date) == 0",
        value: 2,
      },
      value: 0,
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
        field: "median",
        type: "quantitative",
      },
      {
        field: "anomaly",
        type: "quantitative",
      },
    ],
  },
  mark: {
    type: "square",
    stroke: "#ddd",
    size: 140,
  },
};

// -----------------------------------------------------------------------------

// FOOT GRID VIEW

let vlSpec5 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  height: 1400,
  data: { url: `${footTimeSeriesData}` },
  transform: [
    {
      lookup: "id",
      from: {
        data: { url: `${footReferenceData}` },
        key: "id",
        fields: ["median"],
      },
    },
    {
      calculate:
        "datum.median == 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
  ],
  encoding: {
    x: {
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
    y: {
      field: "date",
      type: "temporal",
      axis: {
        title: "",
        grid: false,
        tickCount: 100,
        ticks: false,
        labelFontWeight: {
          condition: {
            test: "day(datum.value) == 6 || day(datum.value) == 0",
            value: "bold",
          },
          value: "normal",
        },
        labelFontSize: {
          condition: {
            test: "day(datum.value) == 6 || day(datum.value) == 0",
            value: 9,
          },
          value: 7,
        },
        labelExpr:
          "timeFormat(datum.value, '%e') == ' 1' ? timeFormat(datum.value, '%B %e') : timeFormat(datum.value, '%a %e')",
      },
    },
    color: {
      field: "anomaly",
      type: "quantitative",
      scale: {
        scheme: "blueOrange",
        domainMid: 0,
      },
      title: "Anomaly",
    },
    strokeWidth: {
      condition: {
        test: "day(datum.date) == 6 || day(datum.date) == 0",
        value: 2,
      },
      value: 0,
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
        field: "median",
        type: "quantitative",
      },
      {
        field: "anomaly",
        type: "quantitative",
      },
    ],
  },
  mark: {
    type: "square",
    stroke: "#ddd",
    size: 140,
  },
};

// -----------------------------------------------------------------------------

// BICYCLE ANOMALY LINE CHART

let vlSpec6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 900,
  height: 500,
  layer: [
    {
      data: { url: `${bicycleTimeSeriesData}` },
      transform: [
        {
          lookup: "id",
          from: {
            data: { url: `${bicycleReferenceData}` },
            key: "id",
            fields: ["median"],
          },
        },
        {
          calculate:
            "datum.median === 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
            gridWidth: 9,
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
            domain: [-100, 100],
          },
          title: "Anomaly",
        },
        color: {
          condition: {
            selection: "legSel",
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
            selection: "legSel",
            value: 1,
          },
          value: 0.2,
        },
        size: {
          condition: {
            selection: "legSel",
            value: 1.5,
          },
          value: 0.3,
        },
      },
      selection: {
        legSel: {
          type: "multi",
          bind: "legend",
          fields: ["station_name"],
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
  ],
};

// -----------------------------------------------------------------------------

// FOOT ANOMALY LINE CHART

let vlSpec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 900,
  height: 500,
  layer: [
    {
      data: { url: `${footTimeSeriesData}` },
      transform: [
        {
          lookup: "id",
          from: {
            data: { url: `${footReferenceData}` },
            key: "id",
            fields: ["median"],
          },
        },
        {
          calculate:
            "datum.median === 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
      ],
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
            gridWidth: 9,
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
            domain: [-100, 100],
          },
          title: "Anomaly",
        },
        color: {
          condition: {
            selection: "legSel",
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
            selection: "legSel",
            value: 1,
          },
          value: 0.2,
        },
        size: {
          condition: {
            selection: "legSel",
            value: 1.5,
          },
          value: 0.3,
        },
      },
      selection: {
        legSel: {
          type: "multi",
          bind: "legend",
          fields: ["station_name"],
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
  ],
};

// -----------------------------------------------------------------------------

// BICYCLE COUNTS LINE CHART

let vlSpec6a = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 900,
  height: 500,
  layer: [
    {
      data: { url: `${bicycleTimeSeriesData}` },
      transform: [
        {
          lookup: "station",
          from: {
            data: { url: `${bicycleStationData}` },
            key: "station_id",
            fields: ["station_name"],
          },
        },
      ],
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
            gridWidth: 9,
            gridColor: "#f6f6f6",
            labelExpr:
              "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
            title: "",
          },
        },
        y: {
          field: "count",
          type: "quantitative",
          title: "Number of people",
        },
        color: {
          condition: {
            selection: "legSel",
            field: "station_name",
            type: "nominal",
            legend: {
              title: null,
              columns: 6,
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
            selection: "legSel",
            value: 1,
          },
          value: 0.2,
        },
        size: {
          condition: {
            selection: "legSel",
            value: 1.5,
          },
          value: 0.3,
        },
      },
      selection: {
        legSel: {
          type: "multi",
          bind: "legend",
          fields: ["station_name"],
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
  ],
};

// -----------------------------------------------------------------------------

// FOOT COUNTS LINE CHART

let vlSpec7a = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 900,
  height: 500,
  layer: [
    {
      data: { url: `${footTimeSeriesData}` },
      transform: [
        {
          lookup: "station",
          from: {
            data: { url: `${footStationData}` },
            key: "station_id",
            fields: ["station_name"],
          },
        },
      ],
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
            gridWidth: 9,
            gridColor: "#f6f6f6",
            labelExpr:
              "timeFormat(datum.value, '%a') == 'Mon' ? timeFormat(datum.value, '%e %b') : ''",
            title: "",
          },
        },
        y: {
          field: "count",
          type: "quantitative",
          title: "Number of people",
        },
        color: {
          condition: {
            selection: "legSel",
            field: "station_name",
            type: "nominal",
            legend: {
              title: null,
              columns: 6,
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
            selection: "legSel",
            value: 1,
          },
          value: 0.2,
        },
        size: {
          condition: {
            selection: "legSel",
            value: 1.5,
          },
          value: 0.3,
        },
      },
      selection: {
        legSel: {
          type: "multi",
          bind: "legend",
          fields: ["station_name"],
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
  ],
};

// -----------------------------------------------------------------------------

// BICYCLE LINKED VIEWS CHART

let vlSpec8 = {
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
                    fields: ["median"],
                  },
                },
                {
                  calculate:
                    "datum.median == 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
                    field: "median",
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
                    fields: ["median"],
                  },
                },
                {
                  calculate:
                    "datum.median == 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
            url: `${blueLines}`,
            format: { type: "topojson", feature: `${blueLineFeature}` },
          },
          mark: {
            type: "geoshape",
            color: "rgb(226,237,246)",
            strokeWidth: 4,
            filled: false,
          },
        },
        {
          data: {
            url: `${bluePolys}`,
            format: {
              type: "topojson",
              feature: `${bluePolyFeature}`,
            },
          },
          mark: {
            type: "geoshape",
            color: "rgb(226,237,246)",
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

// FOOT LINKED VIEWS CHART

let vlSpec9 = {
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
              data: { url: `${footTimeSeriesData}` },
              transform: [
                {
                  lookup: "id",
                  from: {
                    data: { url: `${footReferenceData}` },
                    key: "id",
                    fields: ["median"],
                  },
                },
                {
                  calculate:
                    "datum.median == 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
                    field: "median",
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
              data: { url: `${footTimeSeriesData}` },
              transform: [
                {
                  lookup: "id",
                  from: {
                    data: { url: `${footReferenceData}` },
                    key: "id",
                    fields: ["median"],
                  },
                },
                {
                  calculate:
                    "datum.median == 0 ? 0 : (datum.count - datum.median)/sqrt(datum.median)",
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
            url: `${blueLines}`,
            format: { type: "topojson", feature: `${blueLineFeature}` },
          },
          mark: {
            type: "geoshape",
            color: "rgb(226,237,246)",
            strokeWidth: 4,
            filled: false,
          },
        },
        {
          data: {
            url: `${bluePolys}`,
            format: { type: "topojson", feature: `${bluePolyFeature}` },
          },
          mark: {
            type: "geoshape",
            color: "rgb(226,237,246)",
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
          data: { url: `${footStationData}` },
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
          data: { url: `${footStationData}` },
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
// Reference each of the specs with an ID that can be used in the main HTML.
// If a new spec is added above, add its name along with a corresponding DOM id.

vegaEmbed("#vis2", vlSpec2).catch(console.error);
vegaEmbed("#vis3", vlSpec3).catch(console.error);
vegaEmbed("#vis4", vlSpec4).catch(console.error);
vegaEmbed("#vis5", vlSpec5).catch(console.error);
vegaEmbed("#vis6", vlSpec6).catch(console.error);
vegaEmbed("#vis7", vlSpec7).catch(console.error);
vegaEmbed("#vis6a", vlSpec6a).catch(console.error);
vegaEmbed("#vis7a", vlSpec7a).catch(console.error);
vegaEmbed("#vis8", vlSpec8).catch(console.error);
vegaEmbed("#vis9", vlSpec9).catch(console.error);

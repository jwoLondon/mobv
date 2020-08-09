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

let bicycleAnomalyMax = 80;
let bicycleAnomalyMin = -80;

// INTERACTIVE MAP SPECIFICATION (CURRENTLY LONDON AND GERMANY ONLY)

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
                tickCount: 200,
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
                tickCount: 200,
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

let vlTotalLineChart = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "2019 to 2020 docking station chages",
  config: {
    view: {
      stroke: "",
    },
  },
  width: 1200,
  height: 600,
  layer: [
    {
      data: {
        url:
          "https://jwolondon.github.io/mobv/data/london/StationDailyTimeSeries-BicycleAll2019.csv",
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
                test: "date(datum.value) == 1",
                value: 8,
              },
              value: 0,
            },
            tickCount: 366,
            gridWidth: 4,
            gridColor: "#f6f6f6",
            labelExpr:
              "timeFormat(datum.value, '%e') == 15 ? timeFormat(datum.value, '%b') : ''",
            labelAlign: "center",
            title: "",
            labelFont: "Roboto Condensed",
            labelFontSize: 18,
          },
        },
        y: {
          field: "count",
          type: "quantitative",
          aggregate: "sum",
          title: "Number of docking changes",
          axis: {
            labelFontSize: 12,
            titleFontSize: 18,
            titleFont: "Roboto Condensed",
            labelFont: "Roboto Condensed",
            titleFontWeight: "normal",
          },
        },
      },
      mark: {
        type: "line",
        interpolate: "monotone",
        clip: true,
        strokeWidth: 0.5,
      },
    },
    {
      data: {
        url:
          "https://jwolondon.github.io/mobv/data/london/StationDailyTimeSeries-Bicycle.csv",
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
                test: "date(datum.value) == 1",
                value: 8,
              },
              value: 0,
            },
            tickCount: 366,
            gridWidth: 4,
            gridColor: "#f6f6f6",
            labelExpr:
              "timeFormat(datum.value, '%e') == 15 ? timeFormat(datum.value, '%b') : ''",
            labelAlign: "center",
            title: "",
            labelFont: "Roboto Condensed",
            labelFontSize: 18,
          },
        },
        y: {
          field: "count",
          type: "quantitative",
          aggregate: "sum",
          title: "Number of docking changes",
          axis: {
            labelFontSize: 12,
            titleFontSize: 18,
            titleFont: "Roboto Condensed",
            labelFont: "Roboto Condensed",
            titleFontWeight: "normal",
          },
        },
      },
      mark: {
        type: "line",
        interpolate: "monotone",
        clip: true,
        color: "rgb(177,36,24)",
        strokeWidth: 0.8,
      },
    },
    {
      data: {
        url:
          "https://jwolondon.github.io/mobv/data/london/StationDailyTimeSeries-BicycleAll2019.csv",
      },
      transform: [
        {
          aggregate: [
            {
              op: "sum",
              field: "count",
              as: "dailyTotal",
            },
          ],
          groupby: ["date"],
        },
        {
          window: [
            {
              as: "weeklyAve",
              op: "mean",
              field: "dailyTotal",
            },
          ],
          frame: [-3, 3],
        },
      ],
      encoding: {
        x: {
          field: "date",
          type: "temporal",
          scale: {
            domain: [
              {
                year: 2020,
                month: "Jan",
                date: 1,
              },
              {
                year: 2020,
                month: "Dec",
                date: 31,
              },
            ],
          },
        },
        y: {
          field: "weeklyAve",
          type: "quantitative",
        },
      },
      mark: {
        type: "line",
        interpolate: "monotone",
        clip: true,
        color: "rgb(86,119,164)",
        strokeWidth: 3,
      },
    },
    {
      data: {
        url:
          "https://jwolondon.github.io/mobv/data/london/StationDailyTimeSeries-Bicycle.csv",
      },
      transform: [
        {
          aggregate: [
            {
              op: "sum",
              field: "count",
              as: "dailyTotal",
            },
          ],
          groupby: ["date"],
        },
        {
          window: [
            {
              as: "weeklyAve",
              op: "mean",
              field: "dailyTotal",
            },
          ],
          frame: [-3, 3],
        },
      ],
      encoding: {
        x: {
          field: "date",
          type: "temporal",
          scale: {
            domain: [
              {
                year: 2020,
                month: "Jan",
                date: 1,
              },
              {
                year: 2020,
                month: "Dec",
                date: 31,
              },
            ],
          },
        },
        y: {
          field: "weeklyAve",
          type: "quantitative",
        },
      },
      mark: {
        type: "line",
        interpolate: "monotone",
        color: "rgb(177,36,24)",
        strokeWidth: 4,
      },
    },
    {
      data: {
        url: "https://jwolondon.github.io/mobv/data/london/annotations.csv",
      },
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
    {
      data: {
        values: [
          {
            year: 2020,
            trend: "weekly trend",
            yearLabelY: 10000,
            symbolY: 11000,
          },
          {
            year: 2020,
            trend: "daily count",
            yearLabelY: 10000,
            symbolY: 9000,
          },
          {
            year: 2019,
            trend: "weekly trend",
            yearLabelY: 5000,
            symbolY: 6000,
          },
          {
            year: 2019,
            trend: "daily count",
            yearLabelY: 5000,
            symbolY: 4000,
          },
        ],
      },
      encoding: {
        x: {
          value: 50,
        },
        x2: {
          value: 80,
        },
        y: {
          field: "symbolY",
          type: "quantitative",
        },
        color: {
          field: "year",
          type: "nominal",
          scale: {
            domain: ["2020", "2019"],
            range: ["rgb(177,36,24)", "rgb(86,119,164)"],
          },
          legend: null,
        },
        strokeWidth: {
          field: "trend",
          type: "nominal",
          legend: null,
        },
      },
      mark: "rule",
    },
    {
      data: {
        values: [
          {
            year: 2020,
            trend: "weekly trend",
            yearLabelY: 10000,
            symbolY: 11000,
          },
          {
            year: 2020,
            trend: "daily count",
            yearLabelY: 10000,
            symbolY: 9000,
          },
          {
            year: 2019,
            trend: "weekly trend",
            yearLabelY: 5000,
            symbolY: 6000,
          },
          {
            year: 2019,
            trend: "daily count",
            yearLabelY: 5000,
            symbolY: 4000,
          },
        ],
      },
      layer: [
        {
          encoding: {
            x: {
              value: 20,
            },
            y: {
              field: "yearLabelY",
              type: "quantitative",
            },
            color: {
              field: "year",
              type: "nominal",
              scale: {
                domain: ["2020", "2019"],
                range: ["rgb(177,36,24)", "rgb(86,119,164)"],
              },
              legend: null,
            },
            text: {
              field: "year",
              type: "nominal",
            },
          },
          mark: {
            type: "text",
            align: "left",
            font: "Roboto Condensed",
          },
        },
        {
          encoding: {
            x: {
              value: 85,
            },
            y: {
              field: "symbolY",
              type: "quantitative",
            },
            color: {
              field: "year",
              type: "nominal",
              scale: {
                domain: ["2020", "2019"],
                range: ["rgb(177,36,24)", "rgb(86,119,164)"],
              },
              legend: null,
            },
            text: {
              field: "trend",
              type: "nominal",
            },
          },
          mark: {
            type: "text",
            align: "left",
            font: "Roboto Condensed",
          },
        },
      ],
    },
  ],
};

// -----------------------------------------------------------------------------

let vlHourly2019 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  width: 800,
  height: 200,
  data: {
    url:
      "https://jwolondon.github.io/mobv/data/london/LondonHourlyCount2019.csv",
    format: {
      parse: {
        date: "date:'%Y-%m-%d %H'",
      },
    },
  },
  transform: [
    {
      filter:
        "timeFormat(datum.date,'%Y-%m-%d') > '2020-03-23' || timeFormat(datum.date,'%Y-%m-%d') < '2020-01-01'",
    },
  ],
  encoding: {
    x: {
      field: "date",
      type: "temporal",
      timeUnit: {
        unit: "hours",
      },
      axis: {
        format: "%_I %p",
        labelFont: "Roboto Condensed",
        titleFont: "Roboto Condensed",
        labelAngle: 0,
        title: "",
      },
    },
    y: {
      field: "date",
      type: "ordinal",
      timeUnit: {
        unit: "day",
      },
      sort: [
        {
          day: "Mon",
        },
        {
          day: "Tue",
        },
        {
          day: "Wed",
        },
        {
          day: "Thu",
        },
        {
          day: "Fri",
        },
        {
          day: "Sat",
        },
        {
          day: "Sun",
        },
      ],
      axis: {
        format: "%As",
        labelFont: "Roboto Condensed",
        title: "",
      },
    },
    color: {
      field: "count",
      type: "quantitative",
      scale: {
        scheme: "browns",
        domain: [0, 70],
      },
      legend: {
        title: ["Average docking", "changes per hour"],
        titleFont: "Roboto Condensed",
        labelFont: "Roboto Condensed",
        gradientLength: 170,
        tickCount: 6,
      },
    },
    tooltip: [
      {
        field: "count",
        type: "quantitative",
        format: ".1f",
        title: "Changes per hour",
      },
    ],
  },
  mark: {
    type: "rect",
    stroke: "white",
    strokeWidth: 0.5,
  },
};

let vlHourly2020 = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  data: {
    url: "https://jwolondon.github.io/mobv/data/london/LondonHourlyCount.csv",
    format: {
      parse: {
        date: "date:'%Y-%m-%d %H'",
      },
    },
  },
  transform: [
    {
      filter: "month(datum.date) < 7",
    },
    {
      calculate: "month(datum.date)",
      as: "month",
    },
  ],
  facet: {
    row: {
      field: "month",
      type: "ordinal",
      header: {
        labelAngle: 0,
        labelExpr: "monthAbbrevFormat(datum.value)",
        title: null,
      },
    },
  },
  spec: {
    width: 400,
    height: 100,
    encoding: {
      x: {
        field: "date",
        type: "temporal",
        timeUnit: {
          unit: "hours",
        },
        axis: {
          format: "%_I %p",
          labelFont: "Roboto Condensed",
          titleFont: "Roboto Condensed",
          labelAngle: 0,
          title: "",
        },
      },
      y: {
        field: "date",
        type: "ordinal",
        timeUnit: {
          unit: "day",
        },
        sort: [
          {
            day: "Mon",
          },
          {
            day: "Tue",
          },
          {
            day: "Wed",
          },
          {
            day: "Thu",
          },
          {
            day: "Fri",
          },
          {
            day: "Sat",
          },
          {
            day: "Sun",
          },
        ],
        axis: {
          format: "%As",
          labelFont: "Roboto Condensed",
          title: "",
        },
      },
      color: {
        field: "count",
        type: "quantitative",
        aggregate: "mean",
        scale: {
          scheme: {
            name: "browns",
            extent: [-0.1, 1.2],
          },
          domain: [0, 70],
        },
        legend: {
          title: ["Average docking", "changes per hour"],
          titleFont: "Roboto Condensed",
          labelFont: "Roboto Condensed",
          gradientLength: 170,
          tickCount: 6,
        },
      },
    },
    mark: {
      type: "rect",
      stroke: "white",
      strokeWidth: 0.5,
      tooltip: {
        content: "encoding",
      },
    },
  },
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
            domain: [`${bicycleAnomalyMin}`, `${bicycleAnomalyMax}`],
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
            format: ".0f",
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

vegaEmbed("#visTotal", vlTotalLineChart).catch(console.error);
vegaEmbed("#visHourly2019", vlHourly2019).catch(console.error);
vegaEmbed("#visHourly2020", vlHourly2020).catch(console.error);
vegaEmbed("#visLinkedBicycle", vlSpecLinkedBicycle).catch(console.error);
vegaEmbed("#visMap", vlSpecMap).catch(console.error);

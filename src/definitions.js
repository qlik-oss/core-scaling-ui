const years = {
  qInfo: {
    qType: 'react-filterbox',
  },
  qListObjectDef: {
    qDef: {
      qFieldLabels: ['Year'],
      qFieldDefs: ['Year'],
      autoSort: true,
      qSortCriterias: [
        {
          qSortByState: 1,
          qSortByAscii: 1,
          qSortByNumeric: 1,
          qSortByLoadOrder: 1,
        },
      ],
    },
    qShowAlternatives: true,
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 0,
        qHeight: 1000,
      },
    ],
  },
};

const africanCountries = {
  qInfo: {
    qType: 'table',
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['Country Name'],
          qLabel: 'Country Name',
          qSortCriterias: [
            {
              qSortByNumeric: 1,
            },
          ],
        },
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({$<Africa={'1'}>}Africa)",
          qLabel: "African Countries",
          qReverseSort: false,
        },
        autoSort: true,
        qSortBy: {
          qSortByNumeric: -1,
        },
      },
    ],
    qInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 500,
        qLeft: 0,
        qWidth: 17,
      },
    ],
    qSuppressMissing: true,
    qSuppressZero: true,
  },
};

const allCountries2 = {
  qInfo: {
    qType: 'react-filterbox',
  },
  qListObjectDef: {
    qDef: {
      qFieldLabels: ['Country Name'],
      qFieldDefs: ['Country Name'],
      autoSort: true,
      qSortCriterias: [
        {
          qSortByState: 1,
          qSortByAscii: 1,
          qSortByNumeric: 1,
          qSortByLoadOrder: 1,
        },
      ],
    },
    qShowAlternatives: true,
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 0,
        qHeight: 1000,
      },
    ],
  },
};

const urbanizedCountries = {
  qInfo: {
    qType: 'kpi',
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['Country Name'],
          qLabel: 'Country Name',
          qSortCriterias: [
            {
              qSortByNumeric: 1,
            },
          ],
        },
      },
    ],
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(Max({$<Africa = {1}>}[Urban population [SP.URB.TOTL]]]/[Population, total [SP.POP.TOTL]]]), '####0%')",
          qLabel: 'Urban Population percentage',
          qReverseSort: false,
        },
        autoSort: true,
        qSortBy: {
          qSortByNumeric: -1,
        },
      },
    ],
    qInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 500,
        qLeft: 0,
        qWidth: 17,
      },
    ],
    qSuppressMissing: true,
    qSuppressZero: true,
  },
};

const totalUrbanAfricaNbr = {
  qInfo: {
    qType: 'kpiHyperCube',
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(sum({$<Africa = {1}>}[Urban population [SP.URB.TOTL]]])/sum({$<Africa = {1}>}[Population, total [SP.POP.TOTL]]]), '####0%')",
          qLabel: 'Total Urban Population',
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1,
        },
      },
    ],
    qSuppressMissing: true,
    qSuppressZero: false,
  },
};

const totalUrbanWorldNbr = {
  qInfo: {
    qType: 'kpiHyperCube',
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num((sum({$<Africa = >}[Urban population [SP.URB.TOTL]]]) - sum({$<Africa = {1}>}[Urban population [SP.URB.TOTL]]])) / (sum({$<Africa = >}[Population, total [SP.POP.TOTL]]]) - sum({$<Africa = {1}>}[Population, total [SP.POP.TOTL]]])),'####0%')",
          qLabel: 'Total Urban Population, world perspective',
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1,
        },
      },
    ],
    qSuppressMissing: true,
    qSuppressZero: false,
  },
};

export { years, urbanizedCountries, totalUrbanAfricaNbr, totalUrbanWorldNbr, allCountries2, africanCountries };

const years = {
  qInfo: {
    qType: "react-filterbox"
  },
  qListObjectDef: {
    qDef: {
      qFieldLabels: ["Year"],
      qFieldDefs: ["Year"],
      autoSort: true,
      qSortCriterias: [
        {
          qSortByState: 1,
          qSortByAscii: 1,
          qSortByNumeric: 1,
          qSortByLoadOrder: 1
        }
      ]
    },
    qShowAlternatives: true,
    qInitialDataFetch: [
      {
        qTop: 0,
        qLeft: 0,
        qWidth: 0,
        qHeight: 1000
      }
    ]
  }
};

const africanCountries = {
  qInfo: {
    qType: "table"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["Country Name"],
          qLabel: "Country Name",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({$<Africa={'1'}>}Africa)",
          qLabel: "African Countries",
          qReverseSort: false
        },
        autoSort: true,
        qSortBy: {
          qSortByNumeric: -1
        }
      }
    ],
    qInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 500,
        qLeft: 0,
        qWidth: 17
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: true
  }
};

const urbanizedCountries = {
  qInfo: {
    qType: "kpi"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["Country Name"],
          qLabel: "Country Name",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(Max({<Africa = {1}, [Country Name] = >}[Urban population [SP.URB.TOTL]]]/[Population, total [SP.POP.TOTL]]]), '####0%')",
          qLabel: "Urban Population percentage",
          qReverseSort: false
        },
        autoSort: true,
        qSortBy: {
          qSortByNumeric: -1
        }
      }
    ],
    qInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 500,
        qLeft: 0,
        qWidth: 17
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: true
  }
};

const totalUrbanAfricaNbr = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(sum({$<Africa = {1}, [Country Name] = >}[Urban population [SP.URB.TOTL]]])/sum({<Africa = {1}, [Country Name] = >}[Population, total [SP.POP.TOTL]]]), '####0%')",
          qLabel: "Total Urban Population"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const totalUrbanWorldNbr = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num((sum({<Africa = ,[Country Name] = >}[Urban population [SP.URB.TOTL]]]) - sum({<Africa = {1}, [Country Name] = >}[Urban population [SP.URB.TOTL]]])) / (sum({<Africa = , [Country Name] = >}[Population, total [SP.POP.TOTL]]]) - sum({<Africa = {1}, [Country Name] = >}[Population, total [SP.POP.TOTL]]])),'####0%')",
          qLabel: "Total Urban Population, world perspective"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const urbanAfricanCountriesNbr = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(sum({$<Africa = {1}>}[Urban population [SP.URB.TOTL]]])/sum({<Africa = {1}>}[Population, total [SP.POP.TOTL]]]), '####0%')",
          qLabel: "Total Urban Population"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const avgLifeExpTotal = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({<Africa={1}>}[Life expectancy at birth, total (years)])",
          qLabel: "Life expectancy at birth, total"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const lifeExpCountries = {
  qInfo: {
    qType: "kpi"
  },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["Country Name"],
          qLabel: "Country Name",
          qSortCriterias: [
            {
              qSortByNumeric: 1
            }
          ]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef:
            "Max({<Africa = {1}, [Country Name] = >}[Life expectancy at birth, total (years)])",
          qLabel: "Life expectancy by countries",
          qReverseSort: false
        },
        autoSort: true,
        qSortBy: {
          qSortByNumeric: -1
        }
      }
    ],
    qInterColumnSortOrder: [1, 0],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 500,
        qLeft: 0,
        qWidth: 17
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: true
  }
};

const urbanLandArea = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(Max({<[Year] = >}[Urban land area (sq. km)])/Max({<[Year] = >}[Land area (sq. km)]), '####0%')",
          qLabel: "Urban Land Area %"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const urbanLandAreaAfrica = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef:
            "num(Max({<Africa = {1}, [Year] = >}[Urban land area (sq. km)])/Max({<Africa = {1}, [Year] = >}[Land area (sq. km)]), '####0%')",
          qLabel: "Urban Land Area %"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const scatterplot = {
  qInfo: {
    qType: "scatterplot",
    qId: ""
  },
  type: "scatterplot",
  labels: true,
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ["Country Name"],
          qSortCriterias: [
            {
              qSortByAscii: 1
            }
          ]
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({<Africa={1}>}GDP)",
          qLabel: "Income (GDP per capita)"
        },
        qSortBy: {
          qSortByNumeric: -1
        }
      },
      {
        qDef: {
          qDef: "Avg({<Africa={1}>}[Life expectancy at birth, total (years)])",
          qLabel: "Health (life expectancy in years)"
        }
      },
      {
        qDef: {
          qDef:
            "Avg({<Africa={1}>}[Urban population [SP.URB.TOTL]]]/[Population, total [SP.POP.TOTL]]])",
          qLabel: "Urban population"
        }
      }
    ],
    qInitialDataFetch: [
      {
        qTop: 0,
        qHeight: 100,
        qLeft: 0,
        qWidth: 4
      }
    ],
    qSuppressZero: false,
    qSuppressMissing: true
  }
};

const avgGDP = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({<Africa={1}>}GDP)",
          qLabel: "Average GDP"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const avgBirths = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({<Africa={1}>}[Births By Staff %])",
          qLabel: "Average Births attended by skilled health staff, %"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

const avgWater = {
  qInfo: {
    qType: "kpiHyperCube"
  },
  qHyperCubeDef: {
    qMeasures: [
      {
        qDef: {
          qDef: "Avg({<Africa={1}>}[Drinking Water %])",
          qLabel:
            "Propotion of population using improved drinking water sources, %"
        },
        qSortBy: {
          SortByLoadOrder: 1,
          qSortByNumeric: -1
        }
      }
    ],
    qSuppressMissing: true,
    qSuppressZero: false
  }
};

export {
  years,
  africanCountries,
  urbanizedCountries,
  totalUrbanAfricaNbr,
  totalUrbanWorldNbr,
  urbanAfricanCountriesNbr,
  avgLifeExpTotal,
  lifeExpCountries,
  urbanLandArea,
  urbanLandAreaAfrica,
  scatterplot,
  avgGDP,
  avgBirths,
  avgWater
};

import React from 'react';
import PropTypes from 'prop-types';

const year = '2016';

class KPI extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { result: null };
  }

  componentDidMount() {
    this.createModel();
  }

  async createModel() {
    try {
      const listboxDefYear = {
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

      const listboxDefAfrica = {
        qInfo: {
          qType: 'react-filterbox',
        },
        qListObjectDef: {
          qDef: {
            qFieldLabels: ['Africa'],
            qFieldDefs: ['Africa'],
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

      const tableDef = {
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
                  "num(Max([Urban population [SP.URB.TOTL]]]/[Population, total [SP.POP.TOTL]]]), '####0%')",
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
      const listboxModelYear = await this.props.app.createSessionObject(listboxDefYear);
      const listboxLayoutYear = await listboxModelYear.getLayout();
      /* eslint-disable-next-line max-len */
      const yearItem = listboxLayoutYear.qListObject.qDataPages[0].qMatrix.find(item => item[0].qText === year)[0].qElemNumber;
      listboxModelYear.selectListObjectValues('/qListObjectDef', [yearItem], true);

      const listboxModelAfrica = await this.props.app.createSessionObject(listboxDefAfrica);
      listboxModelAfrica.selectListObjectValues('/qListObjectDef', [0], true);

      const tableModel = await this.props.app.createSessionObject(tableDef);
      const tableLayout = await tableModel.getLayout();
      const mostUrbItem = tableLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const minUrbItem =
        tableLayout.qHyperCube.qDataPages[0].qMatrix[
          tableLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];

      this.setState({
        result: {
          mostUrbanized: { country: mostUrbItem[0].qText, nbr: mostUrbItem[1].qText },
          leastUrbanized: { country: minUrbItem[0].qText, nbr: minUrbItem[1].qText },
        },
      });
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    if (!this.state.result) {
      return null;
    }
    return (
      <p>
        Did you know that {year} the most urbanized country in Africa was{' '}
        {this.state.result.mostUrbanized.country} with {this.state.result.mostUrbanized.nbr}{' '}
        urbanization. The least urbanized country with only {this.state.result.leastUrbanized.nbr}{' '}
        urbanization is {this.state.result.leastUrbanized.country}
      </p>
    );
  }
}

KPI.propTypes = {
  app: PropTypes.object.isRequired,
};

export default KPI;

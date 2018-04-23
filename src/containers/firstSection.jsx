import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import KPI from '../components/kpi';
import Timeline from '../components/timeline';
import { years, urbanizedCountries, totalUrbanAfricaNbr, totalUrbanWorldNbr } from '../definitions';
import styles from './firstSection.css';

const year = '2016';

class FirstSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.createModel();
  }

  async updateTotalUrbanAfrica() {
    const kpiHyperCubeLayout = await this.state.totalUrbanAfricaNbrModel.getLayout();
    const africanUrbanization = kpiHyperCubeLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ africanUrbanization });
  }

  async updateTotalUrbanWorld() {
    const kpiHyperCubeLayout = await this.state.totalUrbanWorldNbrModel.getLayout();
    const worldUrbanization = kpiHyperCubeLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ worldUrbanization });
  }

  async createModel() {
    try {
      // create the models
      /* eslint-disable-next-line max-len */
      const totalUrbanAfricaNbrModel = await this.props.app.createSessionObject(totalUrbanAfricaNbr);
      const totalUrbanWorldNbrModel = await this.props.app.createSessionObject(totalUrbanWorldNbr);
      const tableModel = await this.props.app.createSessionObject(urbanizedCountries);
      const yearModel = await this.props.app.createSessionObject(years);

      // Select year
      const yearLayout = await yearModel.getLayout();
      /* eslint-disable-next-line max-len */
      const yearItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(item => item[0].qText === year)[0].qElemNumber;
      yearModel.selectListObjectValues('/qListObjectDef', [yearItem], false);
      this.setState({ selectedIndex: yearItem });

      const tableLayout = await tableModel.getLayout();
      const mostUrbItem = tableLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const minUrbItem =
        tableLayout.qHyperCube.qDataPages[0].qMatrix[
          tableLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];

      const totalUrbanAfricaNbrLayout = await totalUrbanAfricaNbrModel.getLayout();
      const africanUrbanization = totalUrbanAfricaNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

      const totalUrbanWorldNbrLayout = await totalUrbanWorldNbrModel.getLayout();
      const worldUrbanization = totalUrbanWorldNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

      this.setState({
        yearModel,
        totalUrbanAfricaNbrModel,
        totalUrbanWorldNbrModel,
        yearLayout,
        mostUrbanized: { country: mostUrbItem[0].qText, nbr: mostUrbItem[1].qText },
        leastUrbanized: { country: minUrbItem[0].qText, nbr: minUrbItem[1].qText },
        africanUrbanization,
        worldUrbanization,
        loaded: true,
      });

      totalUrbanAfricaNbrModel.on('changed', () => this.updateTotalUrbanAfrica());
      totalUrbanWorldNbrModel.on('changed', () => this.updateTotalUrbanWorld());
    } catch (error) {
      // console.log(error);
    }
  }

  handleClick = (item) => {
    this.state.yearModel.selectListObjectValues('/qListObjectDef', [item[0].qElemNumber], false);
    this.setState({ selectedIndex: item[0].qElemNumber });
  };

  render() {
    if (!this.state.loaded) {
      return null;
    }

    const selectedItemStyle = {
      backgroundColor: '#f8f8f8',
      width: '35px',
      height: '35px',
      bottom: '-19px',
    };

    const normalItemStyle = {
      width: '18px',
      height: '18px',
      bottom: '-10px',
    };

    const yearItems = this.state.yearLayout.qListObject.qDataPages[0].qMatrix.map(item => (
      <li
        key={item[0].qElemNumber}
        style={{ left: `${item[0].qElemNumber * 60}px` }}
        onClick={() => this.handleClick(item)}
      >
        {item[0].qText}
        <span
          className={styles.bullet}
          style={
            this.state.selectedIndex === item[0].qElemNumber ? selectedItemStyle : normalItemStyle
          }
        />
      </li>
    ));
    return (
      <div className={styles.sectionContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.mainHeader}>Africa</div>
            <div className={styles.subHeader}>Urbanization</div>
          </div>
          <div className={styles.dataContainer}>
            <div className={styles.textContainer}>
              <p>
                Did you know that {year} the most urbanized country in Africa was{' '}
                {this.state.mostUrbanized.country} with {this.state.mostUrbanized.nbr} urbanization.
                The least urbanized country with only {this.state.leastUrbanized.nbr} urbanization
                is {this.state.leastUrbanized.country}
              </p>
            </div>
            <div className={styles.kpiContainer}>
              <KPI
                nbr={this.state.africanUrbanization}
                // text={`${
                //   this.state.africanUrbanization
                // } of the population in Africa lives in urban areas.`}
              />
              <KPI
                nbr={this.state.worldUrbanization}
                // text={`${
                //   this.state.worldUrbanization
                // } of the World population lives in urban areas.`}
              />
              {/* <KPI nbr="2007" text="to be decided." /> */}
              <KPI nbr="2007" text="to be decided." />
            </div>
          </div>
        </div>
        <div className={styles.timelineContainer}>
          <ContainerDimensions>
            <Timeline items={yearItems} startIndex={this.state.selectedIndex} />
          </ContainerDimensions>
        </div>
      </div>
    );
  }
}

FirstSection.propTypes = {
  app: PropTypes.object.isRequired,
};

export default FirstSection;

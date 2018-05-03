import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import KPI from '../components/kpi';
import Timeline from '../components/timeline';
import { years, urbanizedCountries, totalUrbanAfricaNbr, totalUrbanWorldNbr } from '../definitions';
import styles from './firstSection.css';
import DidYouKnow from '../resources/didyouknow.svg';
import House from '../components/house';
import Clouds from '../components/clouds';
import Banner from '../components/banner';

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

  async updateUrbanizedCountries() {
    const layout = await this.state.urbanizedCountriesModel.getLayout();
    const mostUrbItem = layout.qHyperCube.qDataPages[0].qMatrix[0];
    const minUrbItem =
      layout.qHyperCube.qDataPages[0].qMatrix[layout.qHyperCube.qDataPages[0].qMatrix.length - 1];
    this.setState({
      mostUrbanized: { country: mostUrbItem[0].qText, nbr: mostUrbItem[1].qText },
      leastUrbanized: { country: minUrbItem[0].qText, nbr: minUrbItem[1].qText },
    });
  }

  async createModel() {
    try {
      // create the models
      /* eslint-disable-next-line max-len */
      const totalUrbanAfricaNbrModel = await this.props.app.createSessionObject(totalUrbanAfricaNbr);
      const totalUrbanWorldNbrModel = await this.props.app.createSessionObject(totalUrbanWorldNbr);
      const urbanizedCountriesModel = await this.props.app.createSessionObject(urbanizedCountries);
      const yearModel = await this.props.app.createSessionObject(years);

      // Select year
      const yearLayout = await yearModel.getLayout();
      /* eslint-disable-next-line max-len */
      const yearItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(item => item[0].qText === year)[0].qElemNumber;
      yearModel.selectListObjectValues('/qListObjectDef', [yearItem], false);
      this.setState({ selectedIndex: yearItem });

      const urbanizedCountriesLayout = await urbanizedCountriesModel.getLayout();
      const mostUrbItem = urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const minUrbItem =
        urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[
          urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];

      const totalUrbanAfricaNbrLayout = await totalUrbanAfricaNbrModel.getLayout();
      const africanUrbanization = totalUrbanAfricaNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

      const totalUrbanWorldNbrLayout = await totalUrbanWorldNbrModel.getLayout();
      const worldUrbanization = totalUrbanWorldNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

      this.setState({
        yearModel,
        totalUrbanAfricaNbrModel,
        totalUrbanWorldNbrModel,
        urbanizedCountriesModel,
        yearLayout,
        mostUrbanized: { country: mostUrbItem[0].qText, nbr: mostUrbItem[1].qText },
        leastUrbanized: { country: minUrbItem[0].qText, nbr: minUrbItem[1].qText },
        africanUrbanization,
        worldUrbanization,
        loaded: true,
      });

      totalUrbanAfricaNbrModel.on('changed', () => this.updateTotalUrbanAfrica());
      totalUrbanWorldNbrModel.on('changed', () => this.updateTotalUrbanWorld());
      urbanizedCountriesModel.on('changed', () => this.updateUrbanizedCountries());
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
    const selectedYear = this.state.yearLayout.qListObject.qDataPages[0].qMatrix[
      this.state.selectedIndex
    ][0].qText;
    return (
      <div className={styles.sectionContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.subHeader}>Urbanization in</div>
            <div className={styles.mainHeader}>AFRICA</div>
          </div>
          <div className={styles.textContainer}>
            <DidYouKnow className={styles.didyouknow} />
            <div className={styles.infotext}>
              <p>
                <b>{this.state.mostUrbanized.country}</b> was the most urbanized African country{' '}
                {selectedYear} with <b>{this.state.mostUrbanized.nbr}</b> urbanization.
              </p>
            </div>
            <div className={styles.infotext}>
              <p>
                <b>{this.state.leastUrbanized.country}</b> was the least urbanized African country{' '}
                {selectedYear} with only <b>{this.state.leastUrbanized.nbr}</b> urbanization.
              </p>
            </div>
          </div>
          <div className={styles.cloudAndKpiContainer}>
            <div className={styles.cloudContainer}>
              <Banner />
              <Clouds />
            </div>
            <div className={styles.kpiContainer}>
              <KPI
                nbr={this.state.africanUrbanization}
                text={`
                Urban population in Africa ${selectedYear}`}
                animate
              />
              <KPI
                nbr={this.state.worldUrbanization}
                text={`Urban population rest of the world ${selectedYear}`}
                animate
              />
              <KPI
                nbr="2008"
                text="When more than half of the world's population live in urban areas"
              />
            </div>
          </div>
          <House />
        </div>
        {/* <div className={styles.}> */}
        {/* <div className={styles.zigzag}>
            <div className={styles.zigzagLeft} />
            <div className={styles.zigzagRight} />
          </div> */}
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

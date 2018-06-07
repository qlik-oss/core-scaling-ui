import React from "react";
import PropTypes from "prop-types";
import Clouds from "../components/clouds";
import Banner from "../components/banner";
import KPI from "../components/kpi";
import LifeExpectancyKpi from "../components/lifeExpectancyKpi";
import {
  totalUrbanAfricaNbr,
  totalUrbanWorldNbr,
  avgLifeExpFemale,
  avgLifeExpMale,
  lifeExpRate,
  urbanizationRate,
  lifeExpCountries
} from "../definitions";
import "./section.css";
import "./secondSection.css";

class SecondSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.createModel();
  }

  getNbr = layout => {
    const nbr = layout.qHyperCube.qGrandTotalRow[0].qNum;
    if (nbr !== "NaN") {
      return Math.round(nbr);
    }
    return "-";
  };

  getText = layout => layout.qHyperCube.qGrandTotalRow[0].qText;

  async updateTotalUrbanAfrica() {
    const kpiHyperCubeLayout = await this.state.totalUrbanAfricaNbrModel.getLayout();
    const africanUrbanization =
      kpiHyperCubeLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ africanUrbanization });
  }

  async updateTotalUrbanWorld() {
    const kpiHyperCubeLayout = await this.state.totalUrbanWorldNbrModel.getLayout();
    const worldUrbanization =
      kpiHyperCubeLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ worldUrbanization });
  }

  async createModel() {
    try {
      const totalUrbanAfricaNbrModel = await this.props.app.createSessionObject(
        totalUrbanAfricaNbr
      );
      const totalUrbanWorldNbrModel = await this.props.app.createSessionObject(
        totalUrbanWorldNbr
      );
      const avgLifeExpFemaleModel = await this.props.app.createSessionObject(
        avgLifeExpFemale
      );
      const avgLifeExpMaleModel = await this.props.app.createSessionObject(
        avgLifeExpMale
      );
      const lifeExpRateModel = await this.props.app.createSessionObject(
        lifeExpRate
      );
      const urbRateModel = await this.props.app.createSessionObject(
        urbanizationRate
      );
      const lifeExpCountriesModel = await this.props.app.createSessionObject(
        lifeExpCountries
      );

      const totalUrbanAfricaNbrLayout = await totalUrbanAfricaNbrModel.getLayout();
      const africanUrbanization =
        totalUrbanAfricaNbrLayout.qHyperCube.qGrandTotalRow[0].qText;
      const totalUrbanWorldNbrLayout = await totalUrbanWorldNbrModel.getLayout();
      const worldUrbanization =
        totalUrbanWorldNbrLayout.qHyperCube.qGrandTotalRow[0].qText;
      const avgLifeExpFemaleLayout = await avgLifeExpFemaleModel.getLayout();
      const avgLifeExpMaleLayout = await avgLifeExpMaleModel.getLayout();
      const lifeExpRateLayout = await lifeExpRateModel.getLayout();
      const urbRateLayout = await urbRateModel.getLayout();
      const lifeExpLayout = await lifeExpCountriesModel.getLayout();

      const avgLifeExpFemaleNbr = this.getNbr(avgLifeExpFemaleLayout);
      const avgLifeExpMaleNbr = this.getNbr(avgLifeExpMaleLayout);
      const lifeExpRateNbr = this.getText(lifeExpRateLayout);
      const urbRateNbr = this.getText(urbRateLayout);
      const longestLifeExp = lifeExpLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const shortestLifeExp =
        lifeExpLayout.qHyperCube.qDataPages[0].qMatrix[
          lifeExpLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];

      this.setState({
        africanUrbanization,
        worldUrbanization,
        totalUrbanAfricaNbrModel,
        totalUrbanWorldNbrModel,
        avgLifeExpFemaleModel,
        avgLifeExpMaleModel,
        lifeExpRateModel,
        urbRateModel,
        avgLifeExpFemaleNbr,
        avgLifeExpMaleNbr,
        lifeExpRateNbr,
        urbRateNbr,
        longestLifeExp: {
          country: longestLifeExp[0].qText,
          nbr: longestLifeExp[1].qText
        },
        shortestLifeExp: {
          country: shortestLifeExp[0].qText,
          nbr: shortestLifeExp[1].qText
        },
        loaded: true
      });

      totalUrbanAfricaNbrModel.on("changed", () =>
        this.updateTotalUrbanAfrica()
      );
      totalUrbanWorldNbrModel.on("changed", () => this.updateTotalUrbanWorld());
      avgLifeExpFemaleModel.on("changed", () => this.updateAvgLifeExpFemale());
      avgLifeExpMaleModel.on("changed", () => this.updateAvgLifeExpMale());
      lifeExpRateModel.on("changed", () => this.updateLifeExpRate());
      urbRateModel.on("changed", () => this.updateUrbRate());
    } catch (error) {
      console.log(error);
    }
  }

  async updateAvgLifeExpFemale() {
    const avgLifeExpFemaleLayout = await this.state.avgLifeExpFemaleModel.getLayout();
    const avgLifeExpFemaleNbr = this.getNbr(avgLifeExpFemaleLayout);

    this.setState({ avgLifeExpFemaleNbr });
  }

  async updateAvgLifeExpMale() {
    const avgLifeExpMaleLayout = await this.state.avgLifeExpMaleModel.getLayout();
    const avgLifeExpMaleNbr = this.getNbr(avgLifeExpMaleLayout);

    this.setState({ avgLifeExpMaleNbr });
  }

  async updateLifeExpRate() {
    const lifeExpRateLayout = await this.state.lifeExpRateModel.getLayout();
    const lifeExpRateNbr = this.getText(lifeExpRateLayout);

    this.setState({ lifeExpRateNbr });
  }

  async updateUrbRate() {
    const urbRateLayout = await this.state.urbRateModel.getLayout();
    const urbRateNbr = this.getText(urbRateLayout);

    this.setState({ urbRateNbr });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    const bannerText = [
      {
        text: `${
          this.state.longestLifeExp.country
        } is the African country where you live the longest, 
          ${this.state.longestLifeExp.nbr} years.`,
        id: 1
      },
      {
        text: `However, ${
          this.state.shortestLifeExp.country
        } is not really there yet. Here you can expect to live only 
        ${this.state.shortestLifeExp.nbr} years.`,
        id: 2
      },
      {
        text:
          "Rwanda had a severe dip in the life expectancy early 90's, going down from 51 to only 27 years. It has however doubled over the last 20 years.",
        id: 3
      }
    ];

    return (
      <div className="cloudAndKpiContainer sectionTwo">
        <div className="cloudContainer">
          <Banner text={bannerText} color="#FFA515" />
          <Clouds />
        </div>
        <div className="contentWrapper">
          <KPI
            nbr={this.state.africanUrbanization}
            text={`
                Urban population in Africa ${this.props.selectedYear}`}
            bgColor="#3E8DBA"
            fillColor="#AEDBF4"
            animate
          />
          <KPI
            nbr={this.state.worldUrbanization}
            text={`Urban population rest of the world ${
              this.props.selectedYear
            }`}
            bgColor="#F68F00"
            fillColor="#FFAF41"
            animate
          />
          <KPI
            nbr="2008"
            text="When more than half of the world's population live in urban areas"
            fillColor="#FE4C00"
          />
          <LifeExpectancyKpi
            year={this.props.selectedYear}
            femaleNbr={this.state.avgLifeExpFemaleNbr}
            maleNbr={this.state.avgLifeExpMaleNbr}
          />
          <div className="infoWrapper">
            <div className="didyouknow" />
            <div className="infotext">
              <div>
                <b>
                  {this.props.selectedCountry
                    ? this.props.selectedCountry
                    : "African"}
                </b>{" "}
                life expectancy in <b>{this.props.selectedYear}</b> has risen
                with <b>{this.state.lifeExpRateNbr}</b> compared to <b>1960</b>.
                <br />
                <br />
                While urbanization compared to <b>1960</b> is up{" "}
                <b>{this.state.urbRateNbr}</b>.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SecondSection.propTypes = {
  app: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string.isRequired
};

export default SecondSection;

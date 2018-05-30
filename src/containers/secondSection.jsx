import React from "react";
import PropTypes from "prop-types";
import Filterbox from "../components/filterbox";
import Clouds from "../components/clouds";
import Banner from "../components/banner";
import LifeExpectancyKpi from "../components/lifeExpectancyKpi";
import Heart from "../components/heart";
import {
  africanCountries,
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
    this.state = { loaded: false, selectedCountry: "" };
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

  async createModel() {
    try {
      const africanCountriesModel = await this.props.app.createSessionObject(
        africanCountries
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

      const africanCountriesLayout = await africanCountriesModel.getLayout();
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
        africanCountriesModel,
        avgLifeExpFemaleModel,
        avgLifeExpMaleModel,
        lifeExpRateModel,
        urbRateModel,
        africanCountriesLayout,
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

      avgLifeExpFemaleModel.on("changed", () => this.updateAvgLifeExpFemale());
      avgLifeExpMaleModel.on("changed", () => this.updateAvgLifeExpMale());
      lifeExpRateModel.on("changed", () => this.updateLifeExpRate());
      urbRateModel.on("changed", () => this.updateUrbRate());
    } catch (error) {
      console.log(error);
    }
  }

  selectedCountry = country => {
    this.setState({ selectedCountry: country });
  };

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
      <div className="innerContainer sectionTwo">
        <div className="textContainer">
          <Filterbox
            layout={this.state.africanCountriesLayout}
            model={this.state.africanCountriesModel}
            selectedValueCallback={country => this.selectedCountry(country)}
          />
          <Heart />
        </div>
        <div className="cloudAndKpiContainer">
          <div className="cloudContainer">
            <Banner text={bannerText} color="#FFA515" />
            <Clouds />
          </div>
          <div className="contentWrapper">
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
                    {this.state.selectedCountry
                      ? this.state.selectedCountry
                      : "African"}
                  </b>{" "}
                  life expectancy in <b>{this.props.selectedYear}</b> has risen
                  with <b>{this.state.lifeExpRateNbr}</b> compared to{" "}
                  <b>1960</b>.
                  <br />
                  <br />
                  While urbanization compared to <b>1960</b> is up{" "}
                  <b>{this.state.urbRateNbr}</b>.
                </div>
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
  selectedYear: PropTypes.string.isRequired
};

export default SecondSection;

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
  urbanizationRate
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

      const africanCountriesLayout = await africanCountriesModel.getLayout();
      const avgLifeExpFemaleLayout = await avgLifeExpFemaleModel.getLayout();
      const avgLifeExpMaleLayout = await avgLifeExpMaleModel.getLayout();
      const lifeExpRateLayout = await lifeExpRateModel.getLayout();
      const urbRateLayout = await urbRateModel.getLayout();

      const avgLifeExpFemaleNbr = this.getNbr(avgLifeExpFemaleLayout);
      const avgLifeExpMaleNbr = this.getNbr(avgLifeExpMaleLayout);
      const lifeExpRateNbr = this.getText(lifeExpRateLayout);
      const urbRateNbr = this.getText(urbRateLayout);

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
        loaded: true
      });

      avgLifeExpFemaleModel.on("changed", () => this.updateAvgLifeExpFemale());
      avgLifeExpMaleModel.on("changed", () => this.updateAvgLifeExpMale());
      lifeExpRateModel.on("changed", () => this.updateLifeExpRate());
      urbRateModel.on("changed", () => this.updateUrbRate());
    } catch (error) {
      // console.log(error);
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

  getNbr = layout => {
    const nbr = layout.qHyperCube.qGrandTotalRow[0].qNum;
    if (nbr !== "NaN") {
      return Math.round(nbr);
    }
    return "-";
  };

  render() {
    if (!this.state.loaded) {
      return null;
    }

    const bannerText = [
      {
        text:
          "In Sub-Saharan Africa 72% of urban dwellers live in slums, the highest proportion in the world.",
        id: 1
      },
      { text: "text 2", id: 2 },
      { text: "text 3", id: 3 }
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

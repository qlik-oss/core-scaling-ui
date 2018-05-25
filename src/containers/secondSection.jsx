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
  avgLifeExpMale
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

  async updateAvgLifeExp() {
    const avgLifeExpFemaleLayout = await this.state.avgLifeExpFemaleModel.getLayout();
    const avgLifeExpFemaleNbr =
      avgLifeExpFemaleLayout.qHyperCube.qGrandTotalRow[0].qText;
    const avgLifeExpMaleLayout = await this.state.avgLifeExpMaleModel.getLayout();
    const avgLifeExpMaleNbr =
      avgLifeExpMaleLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ avgLifeExpFemaleNbr, avgLifeExpMaleNbr });
  }

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
      const africanCountriesLayout = await africanCountriesModel.getLayout();
      const avgLifeExpFemaleLayout = await avgLifeExpFemaleModel.getLayout();
      const avgLifeExpMaleLayout = await avgLifeExpMaleModel.getLayout();

      const avgLifeExpFemaleNbr =
        avgLifeExpFemaleLayout.qHyperCube.qGrandTotalRow[0].qText;
      const avgLifeExpMaleNbr =
        avgLifeExpMaleLayout.qHyperCube.qGrandTotalRow[0].qText;

      this.setState({
        africanCountriesModel,
        avgLifeExpFemaleModel,
        avgLifeExpMaleModel,
        africanCountriesLayout,
        avgLifeExpFemaleNbr,
        avgLifeExpMaleNbr,
        loaded: true
      });

      avgLifeExpFemaleModel.on("changed", () => this.updateAvgLifeExp());
      avgLifeExpMaleModel.on("changed", () => this.updateAvgLifeExp());
    } catch (error) {
      // console.log(error);
    }
  }

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
          />
          <Heart />
        </div>
        <div className="cloudAndKpiContainer">
          <div className="cloudContainer">
            <Banner text={bannerText} color="#FFA515" />
            <Clouds />
          </div>
          <div className="contentWrapper">
            <LifeExpectancyKpi />
            <div className="infoWrapper">
              <div className="didyouknow" />
              <div className="infotext">
                <div>
                  <b>Egypt</b> life expectancy in <b>2016</b> has risen with <b>45%</b> compared to <b>1960</b>.
                  <br />
                  <br />
                  While urbanization compared to <b>1960</b> is up <b>200%</b>.
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
  app: PropTypes.object.isRequired
};

export default SecondSection;

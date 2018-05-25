import React from "react";
import PropTypes from "prop-types";
import Filterbox from "../components/filterbox";
import Heart from "../components/heart";
import {
  africanCountries,
  avgLifeExpFemale,
  avgLifeExpMale
} from "../definitions";
import "./section.css";

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

    return (
      <div className="innerContainer">
        <div className="textContainer">
          <Filterbox
            layout={this.state.africanCountriesLayout}
            model={this.state.africanCountriesModel}
          />
          <Heart />
        </div>
        <div className="cloudAndKpiContainer" />
      </div>
    );
  }
}

SecondSection.propTypes = {
  app: PropTypes.object.isRequired
};

export default SecondSection;

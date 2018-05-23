import React from "react";
import PropTypes from "prop-types";
import Filterbox from "../components/filterbox";
import Heart from "../components/heart";
import { africanCountries } from "../definitions";
import "./section.css";

class SecondSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false };
  }

  componentDidMount() {
    this.createModel();
  }

  async createModel() {
    try {
      const africanCountriesModel = await this.props.app.createSessionObject(
        africanCountries
      );
      const africanCountriesLayout = await africanCountriesModel.getLayout();

      this.setState({
        africanCountriesModel,
        africanCountriesLayout,
        loaded: true
      });
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

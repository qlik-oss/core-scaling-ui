import React from 'react';
import Filterbox from "../components/filterbox";
import {
  africanCountries
} from "../definitions";
import './section.css';

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
          <Filterbox layout={this.state.africanCountriesLayout} model={this.state.africanCountriesModel} />
        </div>
        <div className="cloudAndKpiContainer" />
      </div>
    );
  }
}

export default SecondSection;
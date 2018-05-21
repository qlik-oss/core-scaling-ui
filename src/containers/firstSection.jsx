import React from "react";
import PropTypes from "prop-types";
import KPI from "../components/kpi";
import {
  urbanizedCountries,
  totalUrbanAfricaNbr,
  totalUrbanWorldNbr
} from "../definitions";
import Clouds from "../components/clouds";
import Banner from "../components/banner";
import "./firstSection.css";
import "./section.css";

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

  async updateUrbanizedCountries() {
    const layout = await this.state.urbanizedCountriesModel.getLayout();
    const mostUrbItem = layout.qHyperCube.qDataPages[0].qMatrix[0];
    const minUrbItem =
      layout.qHyperCube.qDataPages[0].qMatrix[
        layout.qHyperCube.qDataPages[0].qMatrix.length - 1
      ];
    this.setState({
      mostUrbanized: {
        country: mostUrbItem[0].qText,
        nbr: mostUrbItem[1].qText
      },
      leastUrbanized: { country: minUrbItem[0].qText, nbr: minUrbItem[1].qText }
    });
  }

  async createModel() {
    try {
      // create the models
      /* eslint-disable-next-line max-len */
      const totalUrbanAfricaNbrModel = await this.props.app.createSessionObject(
        totalUrbanAfricaNbr
      );
      const totalUrbanWorldNbrModel = await this.props.app.createSessionObject(
        totalUrbanWorldNbr
      );
      const urbanizedCountriesModel = await this.props.app.createSessionObject(
        urbanizedCountries
      );

      const urbanizedCountriesLayout = await urbanizedCountriesModel.getLayout();
      const mostUrbItem =
        urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const minUrbItem =
        urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[
          urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];

      const totalUrbanAfricaNbrLayout = await totalUrbanAfricaNbrModel.getLayout();
      const africanUrbanization =
        totalUrbanAfricaNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

      const totalUrbanWorldNbrLayout = await totalUrbanWorldNbrModel.getLayout();
      const worldUrbanization =
        totalUrbanWorldNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

      this.setState({
        totalUrbanAfricaNbrModel,
        totalUrbanWorldNbrModel,
        urbanizedCountriesModel,
        mostUrbanized: {
          country: mostUrbItem[0].qText,
          nbr: mostUrbItem[1].qText
        },
        leastUrbanized: {
          country: minUrbItem[0].qText,
          nbr: minUrbItem[1].qText
        },
        africanUrbanization,
        worldUrbanization,
        loaded: true
      });

      totalUrbanAfricaNbrModel.on("changed", () =>
        this.updateTotalUrbanAfrica()
      );
      totalUrbanWorldNbrModel.on("changed", () => this.updateTotalUrbanWorld());
      urbanizedCountriesModel.on("changed", () =>
        this.updateUrbanizedCountries()
      );
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    const bannerText = [
      "In Sub-Saharan Africa 72% of urban dwellers live in slums, the highest proportion in the world.",
      "text 2",
      "text 3"
    ];

    return (
      <div className="innerContainer">
        <div className="textContainer">
          <div className="didyouknow" />
          <div className="infotext">
            <p>
              <b>{this.state.mostUrbanized.country}</b> was the most urbanized
              African country {this.props.selectedYear} with{" "}
              <b>{this.state.mostUrbanized.nbr}</b> urbanization.
            </p>
          </div>
          <div className="infotext">
            <p>
              <b>{this.state.leastUrbanized.country}</b> was the least urbanized
              African country {this.props.selectedYear} with only{" "}
              <b>{this.state.leastUrbanized.nbr}</b>{" "}
            </p>
          </div>
        </div>
        <div className="cloudAndKpiContainer">
          <div className="cloudContainer">
            <Banner text={bannerText} color="#74AECB" />
            <Clouds />
          </div>
          <div className="kpiContainer">
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
          </div>
        </div>
      </div>
    );
  }
}

FirstSection.propTypes = {
  app: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired
};

export default FirstSection;

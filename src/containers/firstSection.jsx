import React from "react";
import PropTypes from "prop-types";
import {
  urbanizedCountries,
  urbanLandArea,
  urbanLandAreaAfrica,
  scatterplot
} from "../definitions";
import Clouds from "../components/clouds";
import Banner from "../components/banner";
import PlayPause from "../components/playPause";
import "./firstSection.css";
import "./section.css";
import Scatterplot from "../components/scatterplot";

class FirstSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false, isPlaying: false };
  }

  componentDidMount() {
    this.createModel();
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

  async updateScatterplot() {
    const scatterplotLayout = await this.state.scatterplotModel.getLayout();
    this.setState({ scatterplotLayout });
  }

  async createModel() {
    try {
      // create the models
      const urbanizedCountriesModel = await this.props.app.createSessionObject(
        urbanizedCountries
      );
      const urbanLandAreaModel = await this.props.app.createSessionObject(
        urbanLandArea
      );
      const urbanLandAreaAfricaModel = await this.props.app.createSessionObject(
        urbanLandAreaAfrica
      );
      const scatterplotModel = await this.props.app.createSessionObject(
        scatterplot
      );

      const urbanizedCountriesLayout = await urbanizedCountriesModel.getLayout();
      const mostUrbItem =
        urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const minUrbItem =
        urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[
          urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];

      const urbanLandAreaLayout = await urbanLandAreaModel.getLayout();
      const urbanLandAreaNbr =
        urbanLandAreaLayout.qHyperCube.qGrandTotalRow[0].qText;

      const urbanLandAreaAfricaLayout = await urbanLandAreaAfricaModel.getLayout();
      const urbanLandAreaAfricaNbr =
        urbanLandAreaAfricaLayout.qHyperCube.qGrandTotalRow[0].qText;

      const scatterplotLayout = await scatterplotModel.getLayout();

      this.setState({
        urbanizedCountriesModel,
        scatterplotModel,
        mostUrbanized: {
          country: mostUrbItem[0].qText,
          nbr: mostUrbItem[1].qText
        },
        leastUrbanized: {
          country: minUrbItem[0].qText,
          nbr: minUrbItem[1].qText
        },
        urbanLandAreaNbr,
        urbanLandAreaAfricaNbr,
        scatterplotLayout,
        loaded: true
      });

      urbanizedCountriesModel.on("changed", () =>
        this.updateUrbanizedCountries()
      );
      scatterplotModel.on("changed", () => this.updateScatterplot());
    } catch (error) {
      // console.log(error);
    }
  }

  togglePlay = () => {
    this.props.playTimelineFunc(!this.state.isPlaying);
    this.setState({ isPlaying: !this.state.isPlaying });
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
      {
        text: `${
          this.state.urbanLandAreaNbr
        } of the world's land surface is covered with urban areas. The same number for Africa is ${
          this.state.urbanLandAreaAfricaNbr
        }.`,
        id: 2
      },
      {
        text:
          "Nigeria has the 9th largest urban population in the world, passing 90 million in 2016",
        id: 3
      }
    ];

    return (
      <div className="cloudAndKpiContainer">
        <div className="cloudContainer">
          <Banner text={bannerText} color="#75ADC8" />
          <Clouds />
        </div>
        <div className="kpiContainer">
          <PlayPause
            toggle={this.state.isPlaying}
            onClick={() => {
              this.togglePlay();
            }}
          />
          <Scatterplot layout={this.state.scatterplotLayout} />
          <div className="infoContainer">
            <div className="didyouknow" />
            <div className="infotext">
              <div>
                <b>{this.state.mostUrbanized.country}</b> was the most urbanized
                African country {this.props.selectedYear} with{" "}
                <b>{this.state.mostUrbanized.nbr}</b> urbanization.
              </div>
            </div>
            <div className="infotext">
              <div>
                <b>{this.state.leastUrbanized.country}</b> was the least
                urbanized African country {this.props.selectedYear} with only{" "}
                <b>{this.state.leastUrbanized.nbr}</b>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FirstSection.propTypes = {
  app: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired,
  playTimelineFunc: PropTypes.func.isRequired
};

export default FirstSection;

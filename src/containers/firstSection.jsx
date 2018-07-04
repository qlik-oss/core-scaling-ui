import React from "react";
import PropTypes from "prop-types";
import {
  urbanizedCountries,
  urbanLandArea,
  urbanLandAreaAfrica,
  totalUrbanAfricaNbr,
  totalUrbanWorldNbr,
  scatterplot
} from "../definitions";
import PlayPause from "../components/playPause";
import "./firstSection.css";
import "./section.css";
import Scatterplot from "../components/scatterplot";
import KPI from "../components/kpi";
import dot from "../resources/circle_filled.svg";

class FirstSection extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { loaded: false, isPlaying: false };
  }

  componentDidMount() {
    this.createModel();
  }

  togglePlay = () => {
    const { playTimelineFunc } = this.props;
    const { isPlaying } = this.state;
    playTimelineFunc(!isPlaying);
    this.setState({ isPlaying: !isPlaying });
  };

  async createModel() {
    const { app, setBannerTextsFunc } = this.props;
    try {
      // create the models
      const urbanizedCountriesModel = await app.createSessionObject(
        urbanizedCountries
      );
      const urbanLandAreaModel = await app.createSessionObject(urbanLandArea);
      const urbanLandAreaAfricaModel = await app.createSessionObject(
        urbanLandAreaAfrica
      );
      const scatterplotModel = await app.createSessionObject(scatterplot);
      const totalUrbanAfricaNbrModel = await app.createSessionObject(
        totalUrbanAfricaNbr
      );
      const totalUrbanWorldNbrModel = await app.createSessionObject(
        totalUrbanWorldNbr
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

      const totalUrbanAfricaNbrLayout = await totalUrbanAfricaNbrModel.getLayout();
      const africanUrbanization =
        totalUrbanAfricaNbrLayout.qHyperCube.qGrandTotalRow[0].qText;
      const totalUrbanWorldNbrLayout = await totalUrbanWorldNbrModel.getLayout();
      const worldUrbanization =
        totalUrbanWorldNbrLayout.qHyperCube.qGrandTotalRow[0].qText;

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
        scatterplotLayout,
        africanUrbanization,
        worldUrbanization,
        totalUrbanAfricaNbrModel,
        totalUrbanWorldNbrModel,
        loaded: true
      });

      urbanizedCountriesModel.on("changed", () =>
        this.updateUrbanizedCountries()
      );
      scatterplotModel.on("changed", () => this.updateScatterplot());
      totalUrbanAfricaNbrModel.on("changed", () =>
        this.updateTotalUrbanAfrica()
      );
      totalUrbanWorldNbrModel.on("changed", () => this.updateTotalUrbanWorld());

      const bannerTexts = [
        {
          text:
            "In Sub-Saharan Africa 72% of urban dwellers live in slums, the highest proportion in the world.",
          id: 1
        },
        {
          text: `${urbanLandAreaNbr} of the world's land surface is covered with urban areas. The same number for Africa is ${urbanLandAreaAfricaNbr}.`,
          id: 2
        },
        {
          text:
            "Nigeria has the 9th largest urban population in the world, passing 90 million in 2016",
          id: 3
        }
      ];
      setBannerTextsFunc(bannerTexts);
    } catch (error) {
      // console.log(error);
    }
  }

  async updateUrbanizedCountries() {
    const { urbanizedCountriesModel } = this.state;
    const layout = await urbanizedCountriesModel.getLayout();
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
    const { scatterplotModel } = this.state;
    const scatterplotLayout = await scatterplotModel.getLayout();
    this.setState({ scatterplotLayout });
  }

  async updateTotalUrbanAfrica() {
    const { totalUrbanAfricaNbrModel } = this.state;
    const kpiHyperCubeLayout = await totalUrbanAfricaNbrModel.getLayout();
    const africanUrbanization =
      kpiHyperCubeLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ africanUrbanization });
  }

  async updateTotalUrbanWorld() {
    const { totalUrbanWorldNbrModel } = this.state;
    const kpiHyperCubeLayout = await totalUrbanWorldNbrModel.getLayout();
    const worldUrbanization =
      kpiHyperCubeLayout.qHyperCube.qGrandTotalRow[0].qText;
    this.setState({ worldUrbanization });
  }

  render() {
    const { width, selectedYear, nextSectionFunc } = this.props;
    const {
      loaded,
      mostUrbanized,
      leastUrbanized,
      scatterplotLayout,
      africanUrbanization,
      worldUrbanization,
      isPlaying
    } = this.state;
    if (!loaded) {
      return null;
    }

    const nextButtonText =
      width > 816
        ? "Interesting data! But how does urbanization affect life quality? Click here to see more details!"
        : "More details";
    return (
      <div className="viewContainer first">
        <div className="infoContainer">
          <div className="didyouknow" />
          <div className="infotext">
            <div>
              <b>{mostUrbanized.country}</b> was the most urbanized African
              country
              {selectedYear} with
              <b>{mostUrbanized.nbr}</b> urbanization.
              <br />
              <br />
              <b>{leastUrbanized.country}</b> was the least urbanized African
              country
              {selectedYear} with only
              <b>{leastUrbanized.nbr}</b>{" "}
            </div>
          </div>
          <PlayPause
            toggle={isPlaying}
            onClick={() => {
              this.togglePlay();
            }}
            text={width > 800 ? "Play the urbanization story" : ""}
          />
        </div>
        <div className="scatterplotOuter">
          <div className="yLabel">
            <b>Health</b>
          </div>
          <div className="scatterplotInner">
            <Scatterplot layout={scatterplotLayout} />
            <div className="xLabel">
              <b>Income</b>
            </div>
          </div>
          <div className="legendText">
            <img className="dotIcon" src={dot} alt="dot icon" />urban pop. size
            %
          </div>
        </div>
        <div className="kpiAndButtonContainer">
          <div className="kpiContainer">
            <KPI
              className="kpi"
              nbr={africanUrbanization}
              text={`
                Urban population, Africa ${selectedYear}`}
              bgColor="#3E8DBA"
              fillColor="#AEDBF4"
              animate
            />
            <KPI
              className="kpi"
              nbr={worldUrbanization}
              text={`Urban population, world ${selectedYear}`}
              bgColor="#F68F00"
              fillColor="#FFAF41"
              animate
            />
          </div>
          <button
            className="nextSectionButton"
            type="submit"
            onClick={() => {
              nextSectionFunc();
            }}
          >
            {nextButtonText}
          </button>
        </div>
      </div>
    );
  }
}

FirstSection.propTypes = {
  app: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired,
  playTimelineFunc: PropTypes.func.isRequired,
  nextSectionFunc: PropTypes.func.isRequired,
  width: PropTypes.number,
  setBannerTextsFunc: PropTypes.func.isRequired
};

FirstSection.defaultProps = {
  width: 0
};

export default FirstSection;

import React from "react";
import PropTypes from "prop-types";
import KPI from "../components/kpi";
import CustomSlider from "../components/custom-slider";
import {
  avgLifeExpTotal,
  lifeExpCountries,
  urbanAfricanCountriesNbr,
  avgGDP,
  avgBirths,
  avgWater,
  urbSlider
} from "../definitions";
import "./section.css";
import "./secondSection.css";
import dropIcon from "../resources/drop_icon_80px.svg";
import billIcon from "../resources/bill_icon_n.svg";
import heartIcon from "../resources/heart_icon.svg";
import babyIcon from "../resources/baby_cross.svg";

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

  async createModel() {
    const { app, setBannerTextsFunc } = this.props;
    try {
      const urbanKpiModel = await app.createSessionObject(
        urbanAfricanCountriesNbr
      );
      const avgLifeExpTotalModel = await app.createSessionObject(
        avgLifeExpTotal
      );
      const avgGDPModel = await app.createSessionObject(avgGDP);
      const lifeExpCountriesModel = await app.createSessionObject(
        lifeExpCountries
      );
      const avgBirthsModel = await app.createSessionObject(avgBirths);
      const avgWaterModel = await app.createSessionObject(avgWater);
      const urbSliderModel = await app.createSessionObject(urbSlider);

      const urbanKpiLayout = await urbanKpiModel.getLayout();
      const avgLifeExpTotalLayout = await avgLifeExpTotalModel.getLayout();
      const avgGDPLayout = await avgGDPModel.getLayout();
      const lifeExpLayout = await lifeExpCountriesModel.getLayout();
      const avgBirthsLayout = await avgBirthsModel.getLayout();
      const avgWaterLayout = await avgWaterModel.getLayout();
      const urbSliderLayout = await urbSliderModel.getLayout();

      const urbanKpiNbr = this.getText(urbanKpiLayout);
      const avgGDPNbr = this.getNbr(avgGDPLayout);
      const avgLifeExpTotalNbr = this.getNbr(avgLifeExpTotalLayout);
      const longestLifeExpTmp =
        lifeExpLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const shortestLifeExpTmp =
        lifeExpLayout.qHyperCube.qDataPages[0].qMatrix[
          lifeExpLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];
      const longestLifeExp = {
        country: longestLifeExpTmp[0].qText,
        nbr: longestLifeExpTmp[1].qText
      };
      const shortestLifeExp = {
        country: shortestLifeExpTmp[0].qText,
        nbr: shortestLifeExpTmp[1].qText
      };
      const avgBirthsNbr = this.getNbr(avgBirthsLayout);
      const avgWaterNbr = this.getText(avgWaterLayout);

      this.setState({
        urbanKpiModel,
        avgLifeExpTotalModel,
        avgGDPModel,
        avgBirthsModel,
        avgWaterModel,
        urbSliderModel,
        urbSliderLayout,
        urbanKpiNbr,
        avgLifeExpTotalNbr,
        avgGDPNbr,
        avgBirthsNbr,
        avgWaterNbr,
        loaded: true
      });

      urbanKpiModel.on("changed", () => this.updateUrbanKpi());
      avgLifeExpTotalModel.on("changed", () => this.updateAvgLifeExpTotal());
      avgGDPModel.on("changed", () => this.updateAvgGDP());
      avgBirthsModel.on("changed", () => this.updateAvgBirths());
      avgWaterModel.on("changed", () => this.updateAvgWater());

      const bannerTexts = [
        {
          text: `${
            longestLifeExp.country
          } is the African country where you live the longest, 
            ${longestLifeExp.nbr} years.`,
          id: 1
        },
        {
          text: `However, ${
            shortestLifeExp.country
          } is not really there yet. Here you can expect to live only 
          ${shortestLifeExp.nbr} years.`,
          id: 2
        },
        {
          text:
            "Rwanda had a severe dip in the life expectancy early 90's, going down from 51 to only 27 years. It has however doubled over the last 20 years.",
          id: 3
        }
      ];
      setBannerTextsFunc(bannerTexts);
    } catch (error) {
      // console.log(error);
    }
  }

  async updateUrbanKpi() {
    const { urbanKpiModel } = this.state;
    const urbanKpiLayout = await urbanKpiModel.getLayout();
    const urbanKpiNbr = this.getText(urbanKpiLayout);
    this.setState({ urbanKpiNbr });
  }

  async updateAvgLifeExpTotal() {
    const { avgLifeExpTotalModel } = this.state;
    const avgLifeExpTotalLayout = await avgLifeExpTotalModel.getLayout();
    const avgLifeExpTotalNbr = this.getNbr(avgLifeExpTotalLayout);

    this.setState({ avgLifeExpTotalNbr });
  }

  async updateAvgGDP() {
    const { avgGDPModel } = this.state;
    const avgGDPLayout = await avgGDPModel.getLayout();
    const avgGDPNbr = this.getNbr(avgGDPLayout);

    this.setState({ avgGDPNbr });
  }

  async updateAvgBirths() {
    const { avgBirthsModel } = this.state;
    const avgBirthsLayout = await avgBirthsModel.getLayout();
    const avgBirthsNbr = this.getNbr(avgBirthsLayout);

    this.setState({ avgBirthsNbr });
  }

  async updateAvgWater() {
    const { avgWaterModel } = this.state;
    const avgWaterLayout = await avgWaterModel.getLayout();
    const avgWaterNbr = this.getNbr(avgWaterLayout);

    this.setState({ avgWaterNbr });
  }

  async updateUrbSlider() {
    const { urbSliderModel } = this.state;
    const urbSliderLayout = await urbSliderModel.getLayout();
    this.setState({ urbSliderLayout });
  }

  render() {
    const {
      loaded,
      urbSliderLayout,
      urbSliderModel,
      urbanKpiNbr,
      avgLifeExpTotalNbr,
      avgGDPNbr,
      avgBirthsNbr,
      avgWaterNbr
    } = this.state;
    const { selectedCountry, selectedYear } = this.props;
    if (!loaded) {
      return null;
    }

    return (
      <div className="viewContainer second">
        <div className="kpiAndSliderContainer">
          <div
            className={
              selectedCountry ? "sliderContainer disabled" : "sliderContainer"
            }
          >
            <div className="sliderHeader">
Countries with urbanization (%)
            </div>
            <CustomSlider model={urbSliderModel} layout={urbSliderLayout} />
          </div>
          <div className="kpi2Container">
            <KPI
              className="kpi2"
              nbr={urbanKpiNbr}
              text={
                selectedCountry
                  ? `Average urbanization in ${selectedCountry} ${selectedYear}`
                  : `Average urbanization for countries in selected urbanization range ${selectedYear}`
              }
              bgColor="#3E8DBA"
              fillColor="#AEDBF4"
              animate
            />
          </div>
        </div>
        <div className="lifeExpectancyContainer">
          <div className="itemHeader">
Life Quality Indicators
          </div>
          <div className="iconContainer">
            <div className="iconItem">
              <div className="itemHeader">
                {avgLifeExpTotalNbr}
                {' '}
yr
              </div>
              <div className="itemText">
life expectancy
              </div>
              <img className="itemIcon" src={heartIcon} alt="heart icon" />
            </div>
            <div className="iconItem">
              <div className="itemHeader">
                {avgGDPNbr}
                $
              </div>
              <div className="itemText">
average income
              </div>
              <img className="itemIcon" src={billIcon} alt="bill icon" />
            </div>
            <div className="iconItem">
              <div className="itemHeader">
                {avgWaterNbr}
                %
              </div>
              <div className="itemText">
clean drinking water access
              </div>
              <img className="itemIcon" src={dropIcon} alt="drop icon" />
            </div>
            <div className="iconItem">
              <div className="itemHeader">
                {avgBirthsNbr}
                %
              </div>
              <div className="itemText">
Births by health staff
              </div>
              <img className="itemIcon" src={babyIcon} alt="baby icon" />
            </div>
          </div>
        </div>
        <div className="comparisonContainer">
          <div className="itemHeader">
            Comparison
            <br />
            USA 2015
          </div>
          <div className="itemCompContainer">
            <div className="itemComp">
              <p className="itemCompHeader">
URBANIZATION:
                {' '}
              </p>
              <p>
85%
              </p>
            </div>
            <div className="itemComp">
              <p className="itemCompHeader">
LIFE EXPECTANCY:
                {' '}
              </p>
              <p>
78.69 yr
              </p>
            </div>
            <div className="itemComp">
              <p className="itemCompHeader">
INCOME:
                {' '}
              </p>
              <p>
53029$
              </p>
            </div>
            <div className="itemComp">
              <p className="itemCompHeader">
CLEAN DRINKING WATER ACCESS:
                {' '}
              </p>
              <p>
99.2%
              </p>
            </div>
            <div className="itemComp">
              <p className="itemCompHeader">
BIRTHS BY SKILLED STAFF:
                {' '}
              </p>
              <p>
98.5%
              </p>
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
  selectedCountry: PropTypes.string,
  setBannerTextsFunc: PropTypes.func.isRequired
};

SecondSection.defaultProps = {
  selectedCountry: null
};

export default SecondSection;

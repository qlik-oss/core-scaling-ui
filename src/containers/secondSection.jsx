import React from "react";
import PropTypes from "prop-types";
import Clouds from "../components/clouds";
import Banner from "../components/banner";
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
    try {
      const urbanKpiModel = await this.props.app.createSessionObject(
        urbanAfricanCountriesNbr
      );
      const avgLifeExpTotalModel = await this.props.app.createSessionObject(
        avgLifeExpTotal
      );
      const avgGDPModel = await this.props.app.createSessionObject(avgGDP);
      const lifeExpCountriesModel = await this.props.app.createSessionObject(
        lifeExpCountries
      );
      const avgBirthsModel = await this.props.app.createSessionObject(
        avgBirths
      );
      const avgWaterModel = await this.props.app.createSessionObject(avgWater);
      const urbSliderModel = await this.props.app.createSessionObject(
        urbSlider
      );

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
      const longestLifeExp = lifeExpLayout.qHyperCube.qDataPages[0].qMatrix[0];
      const shortestLifeExp =
        lifeExpLayout.qHyperCube.qDataPages[0].qMatrix[
          lifeExpLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
        ];
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

      urbanKpiModel.on("changed", () => this.updateUrbanKpi());
      avgLifeExpTotalModel.on("changed", () => this.updateAvgLifeExpTotal());
      avgGDPModel.on("changed", () => this.updateAvgGDP());
      avgBirthsModel.on("changed", () => this.updateAvgBirths());
      avgWaterModel.on("changed", () => this.updateAvgWater());
    } catch (error) {
      console.log(error);
    }
  }

  async updateUrbanKpi() {
    const urbanKpiLayout = await this.state.urbanKpiModel.getLayout();
    const urbanKpiNbr = this.getText(urbanKpiLayout);
    this.setState({ urbanKpiNbr });
  }

  async updateAvgLifeExpTotal() {
    const avgLifeExpTotalLayout = await this.state.avgLifeExpTotalModel.getLayout();
    const avgLifeExpTotalNbr = this.getNbr(avgLifeExpTotalLayout);

    this.setState({ avgLifeExpTotalNbr });
  }

  async updateAvgGDP() {
    const avgGDPLayout = await this.state.avgGDPModel.getLayout();
    const avgGDPNbr = this.getNbr(avgGDPLayout);

    this.setState({ avgGDPNbr });
  }

  async updateAvgBirths() {
    const avgBirthsLayout = await this.state.avgBirthsModel.getLayout();
    const avgBirthsNbr = this.getNbr(avgBirthsLayout);

    this.setState({ avgBirthsNbr });
  }

  async updateAvgWater() {
    const avgWaterLayout = await this.state.avgWaterModel.getLayout();
    const avgWaterNbr = this.getNbr(avgWaterLayout);

    this.setState({ avgWaterNbr });
  }

  async updateUrbSlider() {
    const urbSliderLayout = await this.state.urbSliderModel.getLayout();
    this.setState({ urbSliderLayout });
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
      <div className="cloudAndKpiContainer sectionTwo">
        <div className="cloudContainer">
          <Banner text={bannerText} color="#FFA515" />
          <Clouds />
        </div>
        <div className="contentWrapper">
          <div className="kpiAndSliderContainer">
            <div className={this.props.selectedCountry ? "disabled" : ""}>
              <div className="sliderHeader">
                Countries with urbanization (%)
              </div>
              <CustomSlider
                model={this.state.urbSliderModel}
                layout={this.state.urbSliderLayout}
              />
            </div>
            <div className="kpi2Container">
              <KPI
                className="kpi2"
                nbr={this.state.urbanKpiNbr}
                text={
                  this.props.selectedCountry
                    ? `Average urbanization in ${this.props.selectedCountry} ${
                        this.props.selectedYear
                      }`
                    : `Average urbanization for countries in selected urbanization range ${
                        this.props.selectedYear
                      }`
                }
                bgColor="#3E8DBA"
                fillColor="#AEDBF4"
                animate
              />
            </div>
          </div>
          <div className="lifeExpectancyContainer">
            <div className="itemHeader">Life Quality Indicators</div>
            <div className="iconContainer">
              <div className="iconItem">
                <div className="iconItemContent">
                  <div className="itemHeader">
                    {this.state.avgLifeExpTotalNbr} yr
                  </div>
                  <div className="itemText">life expectancy</div>
                  <img className="itemIcon" src={heartIcon} alt="heart icon" />
                </div>
              </div>
              <div className="iconItem">
                <div className="iconItemContent">
                  <div className="itemHeader">{this.state.avgGDPNbr}$</div>
                  <div className="itemText">average income</div>
                  <img className="itemIcon" src={billIcon} alt="bill icon" />
                </div>
              </div>
              <div className="iconItem">
                <div className="iconItemContent">
                  <div className="itemHeader">{this.state.avgWaterNbr}%</div>
                  <div className="itemText">clean drinking water access</div>
                  <img className="itemIcon" src={dropIcon} alt="drop icon" />
                </div>
              </div>
              <div className="iconItem">
                <div className="iconItemContent">
                  <div className="itemHeader">{this.state.avgBirthsNbr}%</div>
                  <div className="itemText">Births by health staff</div>
                  <img className="itemIcon" src={babyIcon} alt="baby icon" />
                </div>
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
              <div className="itemComp">URBANIZATION: 85%</div>
              <div className="itemComp">LIFE EXPECTANCY: 78.69 yr</div>
              <div className="itemComp">INCOME: 53029$</div>
              <div className="itemComp">CLEAN DRINKING WATER ACCESS: 99.2%</div>
              <div className="itemComp">BIRTHS BY SKILLED STAFF: 98.5%</div>
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
  selectedCountry: PropTypes.string
};

SecondSection.defaultProps = {
  selectedCountry: null
};

export default SecondSection;

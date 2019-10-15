import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useModel, useLayout } from "hamus.js";
import KPI from "../components/kpi";
import CustomSlider from "../components/custom-slider";
import useResolvedValue from '../use-resolved-value';
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

const SecondSection = forwardRef(({ app, selectedYear, selectedCountry, setBannerTexts }, ref) => {
  const [loaded, setLoaded] = useState(false);
  const urbanKpiModel = useResolvedValue(useModel(app, urbanAfricanCountriesNbr));
  const urbanKpiLayout = useResolvedValue(useLayout(urbanKpiModel));
  const avgLifeExpTotalModel = useResolvedValue(useModel(app, avgLifeExpTotal));
  const avgLifeExpTotalLayout = useResolvedValue(useLayout(avgLifeExpTotalModel));
  const avgGDPModel = useResolvedValue(useModel(app, avgGDP));
  const avgGDPLayout = useResolvedValue(useLayout(avgGDPModel));
  const lifeExpCountriesModel = useResolvedValue(useModel(app, lifeExpCountries));
  const lifeExpLayout = useResolvedValue(useLayout(lifeExpCountriesModel));
  const avgBirthsModel = useResolvedValue(useModel(app, avgBirths));
  const avgBirthsLayout = useResolvedValue(useLayout(avgBirthsModel));
  const avgWaterModel = useResolvedValue(useModel(app, avgWater));
  const avgWaterLayout = useResolvedValue(useLayout(avgWaterModel));
  const urbSliderModel = useResolvedValue(useModel(app, urbSlider));
  const urbSliderLayout = useResolvedValue(useLayout(urbSliderModel));
  const customSliderRef = useRef();

  useImperativeHandle(ref, () => ({
    resetSlider() {
      if (customSliderRef && customSliderRef.current) {
        customSliderRef.current.reset();
      }
    },
  }));

  useEffect(() => {
    if (!loaded && urbanKpiLayout && avgLifeExpTotalLayout && avgGDPLayout && lifeExpLayout && avgBirthsLayout && avgWaterLayout && urbSliderLayout) {
      setLoaded(true);
    }
  });

  useEffect(() => {
    if (lifeExpLayout) {
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
    setBannerTexts(bannerTexts);
  }
  }, [lifeExpLayout]);

  const getNbr = layout => {
    const nbr = layout.qHyperCube.qGrandTotalRow[0].qNum;
    if (nbr !== "NaN") {
      return Math.round(nbr);
    }
    return "-";
  };

  const getText = layout => layout.qHyperCube.qGrandTotalRow[0].qText;

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
          <div className="sliderHeader">Countries with urbanization (%)</div>
          <CustomSlider
            ref={customSliderRef}
            model={urbSliderModel}
            layout={urbSliderLayout}
          />
        </div>
        <div className="kpi2Container">
          <KPI
            className="kpi2"
            nbr={getText(urbanKpiLayout)}
            text={
              selectedCountry
                ? `Average urbanization in ${selectedCountry} ${
                    selectedYear
                  }`
                : `Average urbanization for countries in selected urbanization range ${
                    selectedYear
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
            <div className="itemHeader">{getNbr(avgLifeExpTotalLayout)} yr</div>
            <div className="itemText">life expectancy</div>
            <img className="itemIcon" src={heartIcon} alt="heart icon" />
          </div>
          <div className="iconItem">
            <div className="itemHeader">
              {getNbr(avgGDPLayout)}
              $
            </div>
            <div className="itemText">average income</div>
            <img className="itemIcon" src={billIcon} alt="bill icon" />
          </div>
          <div className="iconItem">
            <div className="itemHeader">
              {getText(avgWaterLayout)}
              %
            </div>
            <div className="itemText">clean drinking water access</div>
            <img className="itemIcon" src={dropIcon} alt="drop icon" />
          </div>
          <div className="iconItem">
            <div className="itemHeader">
              {getNbr(avgBirthsLayout)}
              %
            </div>
            <div className="itemText">Births by health staff</div>
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
            <p className="itemCompHeader">URBANIZATION: </p>
            <p>85%</p>
          </div>
          <div className="itemComp">
            <p className="itemCompHeader">LIFE EXPECTANCY: </p>
            <p>78.69 yr</p>
          </div>
          <div className="itemComp">
            <p className="itemCompHeader">INCOME: </p>
            <p>53029$</p>
          </div>
          <div className="itemComp">
            <p className="itemCompHeader">CLEAN DRINKING WATER ACCESS: </p>
            <p>99.2%</p>
          </div>
          <div className="itemComp">
            <p className="itemCompHeader">BIRTHS BY SKILLED STAFF: </p>
            <p>98.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
});

SecondSection.propTypes = {
  app: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired,
  selectedCountry: PropTypes.string,
  setBannerTexts: PropTypes.func.isRequired
};

SecondSection.defaultProps = {
  selectedCountry: null
};

export default SecondSection;

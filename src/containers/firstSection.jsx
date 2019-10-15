import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import { useModel, useLayout } from "hamus.js";
import {
  urbanizedCountries,
  urbanLandArea,
  urbanLandAreaAfrica,
  totalUrbanAfricaNbr,
  totalUrbanWorldNbr,
  scatterplot
} from "../definitions";
import PlayPause from "../components/playPause";
import useResolvedValue from '../use-resolved-value';
import "./firstSection.css";
import "./section.css";
import Scatterplot from "../components/scatterplot";
import KPI from "../components/kpi";
import dot from "../resources/circle_outline.svg";

const FirstSection = forwardRef(({ app, selectedYear, playTimeline, nextSection, setBannerTexts }, ref) => {
  const [loaded, setLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const urbanizedCountriesModel = useResolvedValue(useModel(app, urbanizedCountries));
  const urbanizedCountriesLayout = useResolvedValue(useLayout(urbanizedCountriesModel));
  const urbanLandAreaModel = useResolvedValue(useModel(app, urbanLandArea));
  const urbanLandAreaLayout = useResolvedValue(useLayout(urbanLandAreaModel));
  const urbanLandAreaAfricaModel = useResolvedValue(useModel(app, urbanLandAreaAfrica));
  const urbanLandAreaAfricaLayout = useResolvedValue(useLayout(urbanLandAreaAfricaModel));
  const scatterplotModel = useResolvedValue(useModel(app, scatterplot));
  const scatterplotLayout = useResolvedValue(useLayout(scatterplotModel));
  const totalUrbanAfricaNbrModel = useResolvedValue(useModel(app, totalUrbanAfricaNbr));
  const totalUrbanAfricaNbrLayout = useResolvedValue(useLayout(totalUrbanAfricaNbrModel));
  const totalUrbanWorldNbrModel = useResolvedValue(useModel(app, totalUrbanWorldNbr));
  const totalUrbanWorldNbrLayout = useResolvedValue(useLayout(totalUrbanWorldNbrModel));
  const getText = layout => layout.qHyperCube.qGrandTotalRow[0].qText;

  const togglePlayInternal = () => {
    playTimeline(!isPlaying);
    setIsPlaying(!isPlaying);
  };

  useImperativeHandle(ref, () => ({
    togglePlay: () => {
      togglePlayInternal();
    },
  }));

  useEffect(() => {
    if (!loaded && urbanizedCountriesLayout && urbanLandAreaLayout && urbanLandAreaAfricaLayout && scatterplotLayout && totalUrbanAfricaNbrLayout && totalUrbanWorldNbrLayout) {
      setLoaded(true);
    }
  });

  useEffect(() => {
    if (urbanLandAreaLayout && urbanLandAreaAfricaLayout) {
      const bannerTexts = [
        {
          text:
            "In Sub-Saharan Africa 72% of urban dwellers live in slums, the highest proportion in the world.",
          id: 1
        },
        {
          text: `${getText(urbanLandAreaLayout)} of the world's land surface is covered with urban areas. The same number for Africa is ${getText(urbanLandAreaAfricaLayout)}.`,
          id: 2
        },
        {
          text:
            "Nigeria has the 9th largest urban population in the world, passing 90 million in 2016",
          id: 3
        }
      ];
      setBannerTexts(bannerTexts);
    }
  }, [urbanLandAreaLayout, urbanLandAreaAfricaLayout]);


  if (!loaded) {
    return null;
  }

  const mostUrbanized = {
    country: urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[0][0].qText,
    nbr: urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[0][1].qText
  }

  const leastUrbanizedItem = 
    urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix[
      urbanizedCountriesLayout.qHyperCube.qDataPages[0].qMatrix.length - 1
    ];
  const leastUrbanized = {
    country: leastUrbanizedItem[0].qText,
    nbr: leastUrbanizedItem[1].qText
  }

  return (
    <div className="viewContainer first">
      <div className="infoContainer">
        <div className="didyouknow" />
        <div className="infotext">
          <div>
            <b>{mostUrbanized.country}</b>
            &nbsp;was the most urbanized African country &nbsp;{selectedYear}
            &nbsp;with <b>{mostUrbanized.nbr}</b>
            &nbsp;urbanization.
            <br />
            <br />
            <b>{leastUrbanized.country}</b>
            &nbsp;was the least urbanized African country &nbsp;{selectedYear}
            &nbsp;with only <b>{leastUrbanized.nbr}</b>
          </div>
        </div>
        <PlayPause
          toggle={isPlaying}
          onClick={() => {
            togglePlayInternal();
          }}
          text="Play the urbanization story"
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
          <img className="dotIcon" src={dot} alt="dot icon" />
          urban pop. size %
        </div>
      </div>
      <div className="kpiAndButtonContainer">
        <div className="kpiContainer">
          <KPI
            className="kpi"
            nbr={getText(totalUrbanAfricaNbrLayout)}
            text={`
              Urban population, Africa ${selectedYear}`}
            bgColor="#3E8DBA"
            fillColor="#AEDBF4"
            animate
          />
          <KPI
            className="kpi"
            nbr={getText(totalUrbanWorldNbrLayout)}
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
            nextSection();
          }}
        >
          Interesting data! But how does urbanization affect life quality?
          Click here to see more details!
        </button>
      </div>
    </div>
  );
});

FirstSection.propTypes = {
  app: PropTypes.object.isRequired,
  selectedYear: PropTypes.string.isRequired,
  playTimeline: PropTypes.func.isRequired,
  nextSection: PropTypes.func.isRequired,
  setBannerTexts: PropTypes.func.isRequired
};

export default FirstSection;

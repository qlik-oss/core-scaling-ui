import React, { useEffect, useMemo, useRef, useState } from "react";
import usePromise from 'react-use-promise';
import enigma from "enigma.js";
import { useModel, useLayout } from "hamus.js";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import ContainerDimensions from "react-container-dimensions";
import enigmaConfig from "../enigma-config";
import Header from "./header";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";
import Timeline from "../components/timeline";
import Filterbox from "../components/filterbox";
import Banner from "../components/banner";
import Clouds from "../components/clouds";
import { years, countries } from "../definitions";
import useResolvedValue from '../use-resolved-value';
import "./app.css";
import "./section.css";

const year = "2016";
const startPlayYear = "1990";
const subHeaders = ["Urbanization", "Life Quality"];
let interval = 0;

const useApp = (global) => usePromise(() => {
  if (!global) return null;
  if (process.env.NODE_ENV === "production") return global.getActiveDoc();
  return global.openDoc("Shared-Africa-Urbanization.qvf");
}, [global]);
const useGlobal = (session) => usePromise(() => session.open(), [session]);

export default function App() {
  const session = useMemo(() => enigma.create(enigmaConfig), [false]);
  const [global, socketError] = useGlobal(session);
  const [app, appError] = useApp(global);
  const yearModel = useResolvedValue(useModel(app, years));
  const yearLayout = useResolvedValue(useLayout(yearModel));
  const countriesModel = useResolvedValue(useModel(app, countries));
  const countriesLayout = useResolvedValue(useLayout(countriesModel));
  const [currentSection, setCurrentSection] = useState(0);
  const [bannerTextSec1, setBannerTextSec1] = useState();
  const [bannerTextSec2, setBannerTextSec2] = useState([]);
  const [selectedCountry, setSelelectedCountry] = useState();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const firstSection = useRef();
  const secondSectionRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    if (!loaded && yearLayout && countriesLayout && selectedIndex >= 0) {
      setLoaded(true);
    }
  });

  useEffect(() => {
      // Select year
    if (yearLayout && selectedIndex < 0) {
      const yearItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(
        item => item[0].qText === year
      )[0].qElemNumber;
      yearModel.selectListObjectValues("/qListObjectDef", [yearItem], false);
      setSelectedIndex(yearItem);
    } 
  });

  if (socketError ) {
    throw socketError;
  } else if (appError) {
    throw appError;
  }

  const onViewChange = view => {
    setCurrentSection(view[0]);
  };

  const setBannerTexts = (view, texts) => {
    if (view === 0) {
      setBannerTextSec1(texts);
    } else {
      setBannerTextSec2(texts);
    }
  };

  const scrollTo = item => {
    if (item === "urbanization") {
      // reset the slider to "all" value
      secondSectionRef.current.resetSlider();
      trackRef.current.scrollTo(0);
    } else if (item === "lifeexpectancy") {
      trackRef.current.scrollTo(1);
      // if the timeline is playing when switching view - pause.
      if (interval !== 0) {
        firstSection.current.togglePlay();
      }
    }
  };

  const selectCountry = country => {
    setSelelectedCountry(country);
  };

  const handleTimelineClick = item => {
    yearModel.selectListObjectValues(
      "/qListObjectDef",
      [item[0].qElemNumber],
      false
    );
    setSelectedIndex(item[0].qElemNumber);
  };

  const playTimeline = play => {
    const startPlayItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(
      item => item[0].qText === startPlayYear)[0].qElemNumber;
    const lastItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(
      item => item[0].qText === year)[0].qElemNumber;

    let counter = selectedIndex;
    if (play) {
      interval = setInterval(() => {
        if (counter > lastItem || counter < startPlayItem) {
          counter = startPlayItem;
        }
        yearModel.selectListObjectValues("/qListObjectDef", [counter], false);
        setSelectedIndex(counter);
        counter += 1;
      }, 500);
    } else {
      clearInterval(interval);
      interval = 0;
    }
  };

  if (!loaded) {
    return null;
  }

  const selectedItemStyle = {
    backgroundColor: "#fff",
    border: "2px solid #EA8622",
    boxShadow: "0 0 0 2px #fff",
    width: "24px",
    height: "24px",
    bottom: "-12px"
  };

  const normalItemStyle = {
    width: "22px",
    height: "22px",
    bottom: "-10px"
  };

  const yearItems = yearLayout.qListObject.qDataPages[0].qMatrix.map(item => (
    <li
      key={item[0].qElemNumber}
      style={{ left: `${item[0].qElemNumber * 60}px` }}
      onClick={() => handleTimelineClick(item)}
    >
      {item[0].qText}
      <span
        className="bullet"
        style={
          selectedIndex === item[0].qElemNumber
            ? selectedItemStyle
            : normalItemStyle
        }
      />
    </li>
  ));

  const selectedYear = yearLayout.qListObject.qDataPages[0].qMatrix.find(
    item => item[0].qElemNumber === selectedIndex)[0].qText;

  return (
    <div className="page">
      {/* <div className="underConstructionBanner">
        <div className="underConstructionInner">UNDER CONSTRUCTION</div>
      </div> */}
      <Header
        onClick={e => {
          scrollTo(e);
        }}
        activePage={currentSection === 0 ? subHeaders[0] : subHeaders[1]}
      />
      <div className="content">
        <div className="headerContainer">
          <div className="mainHeader">AFRICAN</div>
          <div className="subHeader">{currentSection === 0 ? subHeaders[0] : subHeaders[1]}</div>
        </div>
        <div className="innerContainer">
          <div className="textContainer">
            <Filterbox
              layout={countriesLayout}
              model={countriesModel}
              selectedValueCallback={country => selectCountry(country)}
            />
          </div>
          <div className="contentContainer">
            {bannerTextSec1 && bannerTextSec2 && (
            <Banner
              text={currentSection === 0 ? bannerTextSec1 : bannerTextSec2}
              color={currentSection === 0 ? "#75ADC8" : "#FFA515"}
            />
)}
            <Clouds />
            <ViewPager tag="main">
              <Frame className="frame">
                <Track
                  ref={trackRef}
                  viewsToShow={1}
                  infinite
                  swipe={false}
                  swipeThreshold={1}
                  contain
                  className="track"
                  onViewChange={view => {
                    onViewChange(view);
                  }}
                >
                  <View className="view">
                    <FirstSection
                      ref={firstSection}
                      app={app}
                      selectedYear={selectedYear}
                      playTimeline={play => {
                        playTimeline(play);
                      }}
                      nextSection={() => {
                        scrollTo("lifeexpectancy");
                      }}
                      setBannerTexts={texts => {
                        setBannerTexts(0, texts);
                      }}
                    />
                  </View>
                  <View className="view">
                    <SecondSection
                      ref={secondSectionRef}
                      app={app}
                      selectedYear={selectedYear}
                      selectedCountry={selectedCountry}
                      setBannerTexts={texts => {
                        setBannerTexts(1, texts);
                      }}
                    />
                  </View>
                </Track>
              </Frame>
            </ViewPager>
          </div>
        </div>
        <div className="timelineContainer">
          <ContainerDimensions>
            <Timeline items={yearItems} startIndex={selectedIndex} />
          </ContainerDimensions>
        </div>
      </div>
    </div>
  );
}


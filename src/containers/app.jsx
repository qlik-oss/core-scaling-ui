import React, { Component } from "react";
import enigma from "enigma.js";
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
import "./app.css";
import "./section.css";

const year = "2016";
const startPlayYear = "1990";
let startPlayItem = null;
let lastItem = null;
const subHeaders = ["Urbanization", "Life Quality"];
let interval = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 0,
      bannerTextsView0: [],
      bannerTextsView1: [],
      app: null,
      error: null
    };
    this.getApp();
    this.firstSection = React.createRef();
  }

  onViewChange = view => {
    this.setState({ currentView: view[0] });
  };

  async getApp() {
    const session = enigma.create(enigmaConfig);

    try {
      const global = await session.open();
      const app =
        process.env.NODE_ENV === "production"
          ? await global.getActiveDoc()
          : await global.openDoc("Shared-Africa-Urbanization.qvf");
      const yearModel = await app.createSessionObject(years);
      // Select year
      const yearLayout = await yearModel.getLayout();

      const yearItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(
        item => item[0].qText === year
      )[0].qElemNumber;
      startPlayItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(
        item => item[0].qText === startPlayYear
      )[0].qElemNumber;
      lastItem = yearItem;
      yearModel.selectListObjectValues("/qListObjectDef", [yearItem], false);

      const countriesModel = await app.createSessionObject(countries);
      const countriesLayout = await countriesModel.getLayout();

      this.setState({
        app,
        yearModel,
        yearLayout,
        countriesModel,
        countriesLayout,
        selectedIndex: yearItem
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  setBannerTexts = (view, texts) => {
    if (view === 0) {
      this.setState({ bannerTextsView0: texts });
    } else {
      this.setState({ bannerTextsView1: texts });
    }
  };

  scrollTo = item => {
    if (item === "urbanization") {
      this.track.scrollTo(0);
    } else if (item === "lifeexpectancy") {
      this.track.scrollTo(1);
      // if the timeline is playing when switching view - pause.
      if (interval !== 0) {
        this.firstSection.current.togglePlay();
      }
    }
  };

  selectedCountry = country => {
    this.setState({ selectedCountry: country });
  };

  handleTimelineClick = item => {
    const { yearModel } = this.state;
    yearModel.selectListObjectValues(
      "/qListObjectDef",
      [item[0].qElemNumber],
      false
    );
    this.setState({ selectedIndex: item[0].qElemNumber });
  };

  playTimeline = play => {
    const { selectedIndex, yearModel } = this.state;
    let counter = selectedIndex;
    if (play) {
      interval = setInterval(() => {
        if (counter > lastItem || counter < startPlayItem) {
          counter = startPlayItem;
        }
        yearModel.selectListObjectValues("/qListObjectDef", [counter], false);
        this.setState({ selectedIndex: counter });
        counter += 1;
      }, 500);
    } else {
      clearInterval(interval);
      interval = 0;
    }
  };

  render() {
    const {
      error,
      app,
      yearLayout,
      selectedIndex,
      currentView,
      countriesLayout,
      countriesModel,
      isPlaying,
      selectedCountry,
      bannerTextsView0,
      bannerTextsView1
    } = this.state;
    if (error) {
      const msg =
        error instanceof Event
          ? "Failed to establish a connection to an Engine"
          : error.message;
      return (
        <div className="errorWrapper">
          <span className="errorText">Oops, something went wrong.</span>
          <span>{msg}</span>
        </div>
      );
    }
    if (!app) {
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
        onClick={() => this.handleTimelineClick(item)}
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
    const selectedYear =
      yearLayout.qListObject.qDataPages[0].qMatrix[selectedIndex][0].qText;
    const subHeader = currentView === 0 ? subHeaders[0] : subHeaders[1];
    return (
      <div className="page">
        {/* <div className="underConstructionBanner">
          <div className="underConstructionInner">UNDER CONSTRUCTION</div>
        </div> */}
        <Header
          onClick={e => {
            this.scrollTo(e);
          }}
          activePage={subHeader}
        />
        <div className="content">
          <div className="headerContainer">
            <div className="mainHeader">AFRICAN</div>
            <div className="subHeader">{subHeader}</div>
          </div>
          <div className="innerContainer">
            <div className="textContainer">
              <Filterbox
                layout={countriesLayout}
                model={countriesModel}
                selectedValueCallback={country => this.selectedCountry(country)}
              />
            </div>
            <div className="contentContainer">
              <Banner
                text={currentView === 0 ? bannerTextsView0 : bannerTextsView1}
                color={currentView === 0 ? "#75ADC8" : "#FFA515"}
              />
              <Clouds />
              <ViewPager tag="main">
                <Frame className="frame">
                  <Track
                    ref={c => {
                      this.track = c;
                    }}
                    viewsToShow={1}
                    infinite
                    swipe={false}
                    swipeThreshold={1}
                    contain
                    className="track"
                    onViewChange={view => {
                      this.onViewChange(view);
                    }}
                  >
                    <View className="view">
                      <FirstSection
                        ref={this.firstSection}
                        app={app}
                        selectedYear={selectedYear}
                        playing={isPlaying}
                        playTimelineFunc={play => {
                          this.playTimeline(play);
                        }}
                        nextSectionFunc={() => {
                          this.scrollTo("lifeexpectancy");
                        }}
                        setBannerTextsFunc={texts => {
                          this.setBannerTexts(0, texts);
                        }}
                      />
                    </View>
                    <View className="view">
                      <SecondSection
                        app={app}
                        selectedYear={selectedYear}
                        selectedCountry={selectedCountry}
                        setBannerTextsFunc={texts => {
                          this.setBannerTexts(1, texts);
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
}

export default App;

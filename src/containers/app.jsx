import React, { Component } from "react";
import enigma from "enigma.js";
import { ViewPager, Frame, Track, View } from "react-view-pager";
import ContainerDimensions from "react-container-dimensions";
import enigmaConfig from "../enigma-config";
import Header from "./header";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";
import Timeline from "../components/timeline";
import { years } from "../definitions";
import "./app.css";

const year = "2016";
const subHeaders = ["Urbanization", "Life Expectancy"];

let counter = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { subHeader: subHeaders[0], app: null, error: null };
    this.getApp();
  }

  onViewChange = view => {
    if (view[0] === 0) this.setState({ subHeader: subHeaders[0] });
    else if (view[0] === 1) this.setState({ subHeader: subHeaders[1] });
  };

  async getApp() {
    const session = enigma.create(enigmaConfig);

    try {
      const global = await session.open();
      const app = process.env.NODE_ENV === 'production' ? await global.getActiveDoc() : await global.openDoc('Shared-Africa-Urbanization.qvf');
      const yearModel = await app.createSessionObject(years);
      // Select year
      const yearLayout = await yearModel.getLayout();

      const yearItem = yearLayout.qListObject.qDataPages[0].qMatrix.find(
        item => item[0].qText === year
      )[0].qElemNumber;
      yearModel.selectListObjectValues("/qListObjectDef", [yearItem], false);
      app.addAlternateState("secondSectionState");
      this.setState({
        app,
        yearModel,
        yearLayout,
        selectedIndex: yearItem,
        lastItem: yearItem
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  scrollTo = item => {
    if (item === "urbanization") {
      this.track.scrollTo(0);
    } else if (item === "lifeexpectancy") {
      this.track.scrollTo(1);
    }
  };

  handleClick = item => {
    this.state.yearModel.selectListObjectValues(
      "/qListObjectDef",
      [item[0].qElemNumber],
      false
    );
    this.setState({ selectedIndex: item[0].qElemNumber });
  };

  interval = setInterval(() => {
    if (counter > this.state.lastItem) {
      counter = 0;
    }
    this.state.yearModel.selectListObjectValues(
      "/qListObjectDef",
      [counter],
      false
    );
    this.setState({ selectedIndex: counter });
    counter++;
  }, 1000);

  render() {
    if (this.state.error) {
      const msg =
        this.state.error instanceof Event
          ? "Failed to establish a connection to an Engine"
          : this.state.error.message;
      return (
        <div className="errorWrapper">
          <span className="errorText">Oops, something went wrong.</span>
          <span>{msg}</span>
        </div>
      );
    }
    if (!this.state.app) {
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

    const yearItems = this.state.yearLayout.qListObject.qDataPages[0].qMatrix.map(
      item => (
        <li
          key={item[0].qElemNumber}
          style={{ left: `${item[0].qElemNumber * 60}px` }}
          onClick={() => this.handleClick(item)}
        >
          {item[0].qText}
          <span
            className="bullet"
            style={
              this.state.selectedIndex === item[0].qElemNumber
                ? selectedItemStyle
                : normalItemStyle
            }
          />
        </li>
      )
    );
    const selectedYear = this.state.yearLayout.qListObject.qDataPages[0]
      .qMatrix[this.state.selectedIndex][0].qText;

    return (
      <div className="page">
        <Header
          onClick={e => {
            this.scrollTo(e);
          }}
          activePage={this.state.subHeader}
        />
        <div className="content">
          <div className="headerContainer">
            <div className="mainHeader">AFRICAN</div>
            <div className="subHeader">{this.state.subHeader}</div>
          </div>
          <ViewPager tag="main">
            <Frame className="frame">
              <Track
                ref={c => {
                  this.track = c;
                }}
                viewsToShow={1}
                infinite
                contain
                className="track"
                onViewChange={view => {
                  this.onViewChange(view);
                }}
              >
                <View className="view">
                  <FirstSection
                    app={this.state.app}
                    selectedYear={selectedYear}
                  />
                </View>
                <View className="view">
                  <SecondSection
                    app={this.state.app}
                    selectedYear={selectedYear}
                  />
                </View>
              </Track>
            </Frame>
          </ViewPager>
          <div className="timelineContainer">
            <ContainerDimensions>
              <Timeline
                items={yearItems}
                startIndex={this.state.selectedIndex}
              />
            </ContainerDimensions>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

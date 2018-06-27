import React from "react";
import PropTypes from "prop-types";
import "./filterbox.css";

class Filterbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout,
      selected: []
    };

    props.model.on("changed", () => this.updateLayout());
  }

  async updateLayout() {
    const layout = await this.props.model.getLayout();
    this.setState({ layout });
  }

  selectCountry = (country, i) => {
    this.state.selected.push(i);
    this.props.model.selectListObjectValues(
      "/qListObjectDef",
      [country.qElemNumber],
      true
    );
    if (this.props.selectedValueCallback) {
      const value =
        this.state.selected.length > 1
          ? "selected countries"
          : this.state.layout.qListObject.qDataPages[0].qMatrix[i][0].qText;
      this.props.selectedValueCallback(value);
    }
  };

  clearSelections = () => {
    this.props.model.clearSelections("/qListObjectDef");
    this.setState({ selected: [] });
    if (this.props.selectedValueCallback) {
      this.props.selectedValueCallback("");
    }
  };

  render() {
    const sStyle = {
      color: "#ffffff"
    };

    const xStyle = {
      color: "#C8C8C8"
    };

    function getStyle(item) {
      let style = {};
      let selected = false;
      if (item.qState === "S") {
        style = sStyle;
        selected = true;
      } else if (item.qState === "X") {
        style = xStyle;
      }

      return { style, selected };
    }

    const countries = this.state.layout.qListObject.qDataPages[0].qMatrix.map(
      (country, i) => {
        const listItemStyles = getStyle(country[0]);
        return (
          <div
            onClick={() => {
              this.selectCountry(country[0], i);
            }}
            key={country[0].qElemNumber}
            title={country[0].qText}
            style={listItemStyles.style}
            role="presentation"
          >
            <span className="listText">{country[0].qText}</span>
            <span className="listIcon">
              {listItemStyles.selected ? "✔" : null}
            </span>
          </div>
        );
      }
    );

    return (
      <div className="filterbox">
        <div className="title">Country</div>
        <div className="list">{countries}</div>
        <div
          className="clearSelection"
          role="presentation"
          onClick={() => this.clearSelections()}
        >
          <span>Clear selections</span>
          <span>✖</span>
        </div>
      </div>
    );
  }
}

Filterbox.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  selectedValueCallback: PropTypes.func
};

Filterbox.defaultProps = {
  selectedValueCallback: null
};

export default Filterbox;

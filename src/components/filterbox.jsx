import React from "react";
import PropTypes from "prop-types";
import "./filterbox.css";

class Filterbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: []
    };
  }

  selectCountry = index => {
    this.props.model.clearSelections("/qHyperCubeDef");
    this.state.selected.push(index);
    this.props.model.selectHyperCubeCells(
      "/qHyperCubeDef",
      this.state.selected,
      [0],
      true
    );
    if (this.props.selectedValueCallback) {
      const value =
        this.state.selected.length > 1
          ? "selected countries"
          : this.props.layout.qHyperCube.qDataPages[0].qMatrix[index][0].qText;
      this.props.selectedValueCallback(value);
    }
  };

  clearSelections = () => {
    this.props.model.clearSelections("/qHyperCubeDef");
    this.setState({ selected: [] });
    if (this.props.selectedValueCallback) {
      this.props.selectedValueCallback("");
    }
  };

  render() {
    const countries = this.props.layout.qHyperCube.qDataPages[0].qMatrix.map(
      (country, i) => (
        <div
          onClick={() => this.selectCountry(i)}
          key={country[0].qElemNumber}
          title={country[0].qText}
          role="presentation"
        >
          <span className="listText">{country[0].qText}</span>
          <span className="listIcon">
            {this.state.selected.includes(i) ? "✔" : null}
          </span>
        </div>
      )
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

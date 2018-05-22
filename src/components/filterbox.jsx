import React from "react";
import PropTypes from "prop-types";
import "./filterbox.css";

class Filterbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  selectCountry = index => {
    this.props.model.clearSelections("/qHyperCubeDef");
    this.props.model.selectHyperCubeValues("/qHyperCubeDef", 0, [index], false);
    this.setState({ selected: index });
  };

  clearSelection = () => {
    this.props.model.clearSelections("/qHyperCubeDef");
    this.setState({ selected: null });
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
            {i === this.state.selected ? "✔" : null}
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
          onClick={() => this.clearSelection()}
        >
          <span>Clear selection</span>
          <span>✖</span>
        </div>
      </div>
    );
  }
}

Filterbox.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired
};

export default Filterbox;

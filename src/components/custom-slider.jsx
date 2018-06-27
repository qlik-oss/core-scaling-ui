import React from "react";
import PropTypes from "prop-types";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./custom-slider.css";

const values = [0, 20, 40, 60, 80, 100];
class CustomSlider extends React.Component {
  constructor(props) {
    super(props);
    const items = [{ text: "All", elemNumber: -1 }];
    props.layout.qListObject.qDataPages[0].qMatrix.map(item =>
      items.push({
        text: item[0].qText,
        elemNumber: item[0].qElemNumber
      })
    );
    this.state = { value: 0, items };
  }

  handleChange(value) {
    this.props.model.selectListObjectValues(
      "/qListObjectDef",
      [this.state.items[values.indexOf(value)].elemNumber],
      false
    );
    this.setState({ value });
  }

  render() {
    const labels = {
      0: this.state.items[0].text,
      20: this.state.items[1].text,
      40: this.state.items[2].text,
      60: this.state.items[3].text,
      80: this.state.items[4].text,
      100: this.state.items[5].text
    };

    return (
      <div className="slider">
        <Slider
          min={0}
          max={100}
          step={20}
          value={this.state.value}
          labels={labels}
          onChange={value => {
            this.handleChange(value);
          }}
        />
      </div>
    );
  }
}
CustomSlider.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired
};

export default CustomSlider;

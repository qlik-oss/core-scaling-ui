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
    const { model } = this.props;
    const { items } = this.state;
    model.selectListObjectValues(
      "/qListObjectDef",
      [items[values.indexOf(value)].elemNumber],
      false
    );
    this.setState({ value });
  }

  render() {
    const { items, value } = this.state;

    const labels = {
      0: items[0].text,
      20: items[1].text,
      40: items[2].text,
      60: items[3].text,
      80: items[4].text,
      100: items[5].text
    };

    return (
      <div className="slider">
        <Slider
          min={0}
          max={100}
          step={20}
          value={value}
          labels={labels}
          onChange={newValue => {
            this.handleChange(newValue);
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

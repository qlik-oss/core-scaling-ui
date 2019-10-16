import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import "./custom-slider.css";

const values = [0, 20, 40, 60, 80, 100];

const CustomSlider = forwardRef(({ model, layout }, ref) => {
  const [value, setValue] = useState(0);
  const [items,] = useState(() => { 
    const elems = [{ text: "All", elemNumber: -1 }];
    layout.qListObject.qDataPages[0].qMatrix.map(elem =>
      elems.push({
        text: elem[0].qText,
        elemNumber: elem[0].qElemNumber
      })
    );
    return elems;
  });

  const handleChange = newValue => {
    setValue(newValue);
  };

  const handleChangeComplete = reset => {
    let newValue = items[values.indexOf(value)].elemNumber;
    if (reset) {
      newValue = items[values.indexOf(0)].elemNumber;
    }
    model.selectListObjectValues("/qListObjectDef", [newValue], false);
  };

  useImperativeHandle(ref, () => ({
    reset() {
      handleChange(0);
      handleChangeComplete(true);
    },
  }));

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
          handleChange(newValue);
        }}
        onChangeComplete={() => {
          handleChangeComplete();
        }}
      />
    </div>
  );
});

CustomSlider.propTypes = {
  model: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired
};

export default CustomSlider;

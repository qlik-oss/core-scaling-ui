import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import "./playPause.css";

export default function PlayPause(props) {
  return (
    <Motion style={{ scale: spring(props.toggle ? 1 : 0, [300, 30]) }}>
      {({ scale }) => (
        <button type="button" className="playpause" onClick={props.onClick}>
          <span
            className="playpause-play"
            style={{ transform: `scaleX(${1 - scale})` }}
          />
          <span
            className="playpause-pause"
            style={{ transform: `scaleX(${scale})` }}
          />
        </button>
      )}
    </Motion>
  );
}

PlayPause.propTypes = {
  toggle: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import "./playPause.css";

export default function PlayPause(props) {
  const { toggle, onClick, text } = props;
  return (
    <Motion style={{ scale: spring(toggle ? 1 : 0, [300, 30]) }}>
      {({ scale }) => (
        <button type="button" className="playpauseContainer" onClick={onClick}>
          <div className="playpause">
            <span
              className="playpause-play"
              style={{ transform: `scaleX(${1 - scale})` }}
            />
            <span
              className="playpause-pause"
              style={{ transform: `scaleX(${scale})` }}
            />
          </div>
          {text !== "" && (
          <div className="playpauseButtonText">
            {text}
          </div>
)}
        </button>
      )}
    </Motion>
  );
}

PlayPause.propTypes = {
  toggle: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};
PlayPause.defaultProps = {
  text: ""
};

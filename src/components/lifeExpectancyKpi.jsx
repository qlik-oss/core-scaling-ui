import React from "react";
import PropTypes from "prop-types";
import "./lifeExpectancyKpi.css";

export default function LifeExpectancyKpi(props) {
  return (
    <div className="kpiWrapper">
      <svg
        width="210px"
        height="310px"
        viewBox="0 30 230 310"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              fill="#ffa515"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="4px"
              d="M215.16,173.09,163.42,93.42a16,16,0,0,0-12.48-7.24l0-.18h-81l0,.15a16,16,0,0,0-13.53,7.27L4.58,173.09a16,16,0,1,0,26.84,17.43l31.74-48.87L50.94,243H65.87V349a19,19,0,0,0,38,0V243h13V349a19,19,0,0,0,38,0V243h15l-12-99.35,30.44,46.87a16,16,0,1,0,26.84-17.43Z"
            />
            <circle
              fill="#ffa515"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="4px"
              cx="110.87"
              cy="40"
              r="38"
            />
          </g>
        </g>
      </svg>
      <div className="middleArea">
        <span className="kpiTitle">
          Average life expectancy <b>{props.year}</b>
        </span>
        <div className="circleWrapper">
          <div className="kpiCircle woman">
            {props.femaleNbr}
            <span>years</span>
          </div>
          <div className="kpiCircle man">
            {props.maleNbr}
            <span>years</span>
          </div>
        </div>
      </div>
      <svg
        width="210px"
        height="310px"
        viewBox="0 30 230 310"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs />
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              fill="#75adc8"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="4px"
              d="M223.16,173.09,171.42,93.42a16,16,0,0,0-13.55-7.27V86h-89v.17a16,16,0,0,0-12.55,7.25L4.58,173.09a16,16,0,1,0,26.84,17.43l37.45-57.66V349a19,19,0,0,0,38,0V222h13V349a19,19,0,0,0,38,0V131.31l38.45,59.21a16,16,0,1,0,26.84-17.43Z"
            />
            <circle
              fill="#75adc8"
              stroke="#fff"
              strokeMiterlimit="10"
              strokeWidth="4px"
              cx="113.87"
              cy="40"
              r="38"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

LifeExpectancyKpi.propTypes = {
  year: PropTypes.string.isRequired,
  // male: PropTypes.bool,
  // nbr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  femaleNbr: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  maleNbr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

// LifeExpectancyKpi.defaultProps = {
//   male: false
// };

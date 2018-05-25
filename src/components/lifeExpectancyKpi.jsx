import React from "react";
import PropTypes from "prop-types";
import "./lifeExpectancyKpi.css";

class LiftExpectancyKpi extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  render() {
    return (
      <div className="kpiWrapper">
        <svg
          width="183px"
          height="306px"
          viewBox="0 0 183 306"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Life-expectancy-Copy"
              transform="translate(-600.000000, -490.000000)"
              fill="#FFA515"
              stroke="#FFFFFF"
              strokeWidth="4"
            >
              <g id="woman" transform="translate(600.000000, 490.000000)">
                <path
                  d="M125.548986,72.2295082 L60.2927935,72.2295082 L60.2624564,72.5438549 L58.2783478,72.3597618 C54.0304639,71.9656271 49.8738121,73.9315577 47.5086867,77.5735314 L4.44344774,143.888184 C0.967876671,149.240094 2.48895001,156.396182 7.84086012,159.871753 C13.1927702,163.347324 20.3488577,161.82625 23.8244287,156.47434 L57.1088604,105.22081 L56.3233454,113.360165 L52.7921724,149.931182 L44.7383839,207.852459 L56.30131,207.852459 L56.30131,289.90393 C56.30131,297.688975 62.6123355,304 70.3973799,304 C78.1824243,304 84.4934498,297.688975 84.4934498,289.90393 L84.4934498,207.852459 L99.5065502,207.852459 L99.5065502,289.90393 C99.5065502,297.688975 105.817576,304 113.60262,304 C121.387665,304 127.69869,297.688975 127.69869,289.90393 L127.69869,207.852459 L140.907992,207.852459 L132.735276,149.845986 L128.888772,109.592779 L159.334014,156.47434 C162.809585,161.82625 169.965673,163.347324 175.317583,159.871753 C180.669493,156.396182 182.190566,149.240094 178.714995,143.888184 L135.649756,77.5735314 C133.689044,74.5542993 130.491536,72.6684882 126.972312,72.355923 L125.548986,72.2295082 Z M92.4235808,61.5409836 C109.104099,61.5409836 122.615721,48.2063349 122.615721,31.7704918 C122.615721,15.3346487 109.104099,2 92.4235808,2 C75.743063,2 62.231441,15.3346487 62.231441,31.7704918 C62.231441,48.2063349 75.743063,61.5409836 92.4235808,61.5409836 Z"
                  id="Combined-Shape"
                />
              </g>
            </g>
          </g>
        </svg>
        <div className="middleArea">
          <span className="kpiTitle">
            Average life expectancy <b>{this.props.year}</b>
          </span>
          <div className="circleWrapper">
            <div className="kpiCircle woman">
              {this.props.femaleNbr}
              <span>years</span>
            </div>
            <div className="kpiCircle man">
              {this.props.maleNbr}
              <span>years</span>
            </div>
          </div>
        </div>
        <svg
          width="189px"
          height="306px"
          viewBox="0 0 189 306"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs />
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Life-expectancy"
              transform="translate(-1164.000000, -490.000000)"
              fill="#75ADC8"
              stroke="#FFFFFF"
              strokeWidth="4"
            >
              <g id="human" transform="translate(1164.000000, 490.000000)">
                <path
                  d="M58.6033755,72.2295082 L58.6033755,70.2295082 L56.6033755,70.2295082 L56.6033755,72.2295082 L58.6033755,72.2295082 Z M129.708861,72.2295082 L131.708861,72.2295082 L131.708861,70.2295082 L129.708861,70.2295082 L129.708861,72.2295082 Z M94.5780591,61.5409836 C111.188031,61.5409836 124.64557,48.2080929 124.64557,31.7704918 C124.64557,15.3328907 111.188031,2 94.5780591,2 C77.9680869,2 64.5105485,15.3328907 64.5105485,31.7704918 C64.5105485,48.2080929 77.9680869,61.5409836 94.5780591,61.5409836 Z"
                  id="Combined-Shape"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

LiftExpectancyKpi.propTypes = {
  year: PropTypes.string.isRequired,
  femaleNbr: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  maleNbr: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default LiftExpectancyKpi;

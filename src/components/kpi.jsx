import React from "react";
import PropTypes from "prop-types";
import "./kpi.css";

class KPI extends React.Component {
  constructor(...args) {
    super(...args);
    const { nbr } = this.props;
    this.state = { animatePath: this.getAnimatePath(0, nbr) };
  }

  componentWillReceiveProps(newProps) {
    const { nbr } = this.props;
    if (newProps.nbr !== nbr) {
      this.setState(
        { animatePath: this.getAnimatePath(nbr, newProps.nbr) },
        () => this.startAnimation()
      );
    }
  }

  getAnimatePath(from, to) {
    const { animate } = this.props;
    if (animate) {
      return `${parseFloat(from) / 100.0};${parseFloat(to) / 100.0}`;
    }
    return "1";
  }

  startAnimation() {
    this.svg1.beginElement();
    this.svg2.beginElement();
  }

  render() {
    const { className, nbr, fillColor, bgColor, text } = this.props;
    const { animatePath } = this.state;
    return (
      <div className={className}>
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
          <g>
            <linearGradient id={nbr} x1="0.5" y1="1" x2="0.5" y2="0">
              <stop offset="0%" stopOpacity="1" stopColor={fillColor} />
              <stop offset={nbr} stopOpacity="1" stopColor={fillColor}>
                <animate
                  ref={svg1 => {
                    this.svg1 = svg1;
                  }}
                  attributeName="offset"
                  values={animatePath}
                  dur="0.5s"
                  begin="0s"
                />
              </stop>
              <stop offset={nbr} stopOpacity="1" stopColor={bgColor}>
                <animate
                  ref={svg2 => {
                    this.svg2 = svg2;
                  }}
                  attributeName="offset"
                  values={animatePath}
                  dur="0.5s"
                  begin="0s"
                />
              </stop>
              <stop offset="100%" stopOpacity="1" stopColor={bgColor} />
            </linearGradient>
            <circle
              cx="250"
              cy="250"
              r="245"
              fill={`url(#${nbr})`}
              stroke="white"
              strokeWidth="10"
            />
            <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="white">
              {nbr}
            </text>
          </g>
        </svg>
        <div className="kpiText">
          {text}
        </div>
      </div>
    );
  }
}

KPI.propTypes = {
  className: PropTypes.string.isRequired,
  nbr: PropTypes.string,
  text: PropTypes.string,
  bgColor: PropTypes.string,
  fillColor: PropTypes.string,
  animate: PropTypes.bool
};

KPI.defaultProps = {
  nbr: "",
  text: "",
  bgColor: "grey",
  fillColor: "lightgrey",
  animate: false
};

export default KPI;

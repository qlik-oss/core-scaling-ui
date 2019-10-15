import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./kpi.css";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const KPI = ({ className, nbr, animate, text, bgColor, fillColor }) => {
  const prevNbr = usePrevious(nbr);

  const getAnimatePath = (from, to) => {
    if (animate) {
      return `${parseFloat(from) / 100.0};${parseFloat(to) / 100.0}`;
    }
    return "1";
  };

  const [animatePath, setAnimatePath] = useState(getAnimatePath(0, nbr));
  const svg1 = useRef();
  const svg2  = useRef();

  const startAnimation = () => {
    svg1.current.beginElement();
    svg2.current.beginElement();
  };

  useEffect(() => {
    setAnimatePath(getAnimatePath(prevNbr !== nbr ? prevNbr : 0, nbr));
    startAnimation();
  }, [nbr]);

  return (
    <div className={className}>
      <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
        <g>
          <linearGradient
            id={className + nbr}
            x1="0.5"
            y1="1"
            x2="0.5"
            y2="0"
          >
            <stop offset="0%" stopOpacity="1" stopColor={fillColor} />
            <stop offset={nbr} stopOpacity="1" stopColor={fillColor}>
              <animate
                ref={svg1}
                attributeName="offset"
                values={animatePath}
                dur="0.5s"
                begin="0s"
              />
            </stop>
            <stop offset={nbr} stopOpacity="1" stopColor={bgColor}>
              <animate
                ref={svg2}
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
            fill={`url(#${className + nbr})`}
            stroke="white"
            strokeWidth="10"
          />
          <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="white">
            {nbr}
          </text>
        </g>
      </svg>
      <div className="kpiText">{text}</div>
    </div>
  );
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

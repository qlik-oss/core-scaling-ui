import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Text from "react-svg-text";
import "./banner.css";

export default function Banner({ text, color }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const textEl = document.getElementById("__react_svg_text_measurement_id");
    if (textEl) {
      textEl.parentElement.style.position = "absolute";
      textEl.parentElement.style.left = "-999em";
    }
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => prevSlide < 2 ? prevSlide + 1 : 0);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const dotClick = index => {
    setCurrentSlide(index);
  };

  const dotsGroup = text.map((item, i) => {
    const position = 6 + i * 18;
    const bgColor = currentSlide === i ? "#FFFFFF" : "#D8D8D8";
    return (
      <circle
        key={item.id}
        fill={bgColor}
        cx={position}
        cy="6"
        r="6"
        onClick={() => dotClick(i)}
      />
    );
  });

  const textGroup = text.map((item, i) => {
    if (currentSlide === i) {
      return (
        <Text
          key={item.id}
          x="22"
          y="52"
          dx="0"
          dy="0"
          verticalAnchor="start"
          textAnchor="middle"
          width="320"
          fill="#fff"
          className="cloudText"
        >
          {item.text}
        </Text>
      );
    }
    return null;
  });

  return (
    <svg
      className="banner"
      width="429px"
      height="161px"
      viewBox="0 0 429 161"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <rect id="path-1" x="0" y="0" width="430" height="162" />
        <path
          d="M8,0 L418,-1.77635684e-15 C422.418278,2.8805772e-14 426,3.581722 426,8 L426,178.205707 C426,182.292801 422.919269,185.722696 418.855618,186.15982 L216.010708,207.979688 L7.16797144,186.140864 C3.0940207,185.714848 -1.54855761e-14,182.280413 -1.59872116e-14,178.184248 L-2.84217094e-14,8 C-3.0924902e-14,3.581722 3.581722,-9.64732338e-16 8,-1.77635684e-15 Z"
          id="path-3"
        />
        <filter
          x="-0.8%"
          y="-1.2%"
          width="102.1%"
          height="104.8%"
          filterUnits="objectBoundingBox"
          id="filter-4"
        >
          <feOffset
            dx="1"
            dy="3"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          />
          <feGaussianBlur
            stdDeviation="1"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
            type="matrix"
            in="shadowBlurOuter1"
          />
        </filter>
      </defs>
      <g
        id="V2.0"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g
          id="Life-expectancy-Copy-3"
          transform="translate(-1387.000000, -64.000000)"
        >
          <g id="Banner" transform="translate(1387.000000, 64.000000)">
            <g id="infotickerbanner">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <use id="Mask" fill="#D8D8D8" opacity="0" xlinkHref="#path-1" />
              <g
                id="infotickerbanner-copy"
                opacity="0.921648551"
                mask="url(#mask-2)"
              >
                <g transform="translate(0.000000, -53.000000)">
                  <g id="background" stroke="none">
                    <use
                      fill="black"
                      fillOpacity="1"
                      filter="url(#filter-4)"
                      xlinkHref="#path-3"
                    />
                    <use
                      fill={color}
                      fillRule="evenodd"
                      xlinkHref="#path-3"
                    />
                  </g>
                  <path
                    d="M215.159442,200.152495 L411.60832,180.592121 C415.188021,180.235691 417.914761,177.223966 417.914761,173.626565 L417.914761,35.1304348 C417.914761,31.2644415 414.780754,28.1304348 410.914761,28.1304348 L15.0852391,28.1304348 C11.2192458,28.1304348 8.08523909,31.2644415 8.08523909,35.1304348 L8.08523909,173.611645 C8.08523909,177.214536 10.8200594,180.228976 14.4059457,180.578607 L215.159442,200.152495 Z"
                    id="whiteframe"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <g
                    id="dots"
                    transform="translate(190, 170)"
                    className="dots"
                  >
                    {dotsGroup}
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      {textGroup}
    </svg>
  );
}

Banner.propTypes = {
  text: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired
};

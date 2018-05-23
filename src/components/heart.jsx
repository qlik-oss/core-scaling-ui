import React from "react";
import "./heart.css";

export default function Heart() {
  return (
    <svg
      className="heart"
      width="630px"
      height="492px"
      viewBox="0 0 629 493"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter id="glow" x="0" y="0">
          <feGaussianBlur
            result="blurOut"
            in="SourceGraphic"
            stdDeviation="3"
          />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Heart">
          <path
            d="M314.667457,92.7873543 C386.323556,17.3695385 451.000347,-12.0725047 508.697829,4.46122491 C558.546985,18.7459465 593.548752,54.050695 612.896263,92.7873543 C671.797841,210.717275 572.388239,343.55543 314.667457,491.301818 C56.9447331,343.556167 -42.4656179,210.717012 16.4364042,92.7862025 C35.7840605,54.0492512 70.7860912,18.7442368 120.635623,4.45940749 C178.33354,-12.0744467 243.010818,17.3678183 314.667457,92.7862025 Z"
            id="Combined-Shape"
            fillOpacity="0.63708673"
            fill="#FF0000"
          />
          <path
            d="M56.8408148,281.212629 L187.393182,281.212629 C188.296515,281.212629 189.087716,280.607105 189.32372,279.735146 L198.93231,244.234381 C199.220888,243.168174 200.319158,242.537782 201.385364,242.82636 C202.131695,243.028361 202.694739,243.642453 202.831372,244.403468 L223.830125,361.361957 C224.025319,362.449143 225.064893,363.172246 226.152079,362.977052 C227.004258,362.824052 227.661224,362.140091 227.779803,361.282444 L262.023591,113.60765 C262.174871,112.513489 263.1845,111.749133 264.278661,111.900413 C265.143306,112.01996 265.830551,112.686438 265.976564,113.547009 L298.454712,304.967147 C298.639483,306.056153 299.672083,306.78918 300.761089,306.604409 C301.538769,306.47246 302.166256,305.895743 302.363194,305.131929 L318.617203,242.091616 C318.892981,241.022027 319.983616,240.378516 321.053205,240.654293 C321.703935,240.822075 322.226905,241.305445 322.445301,241.940978 L335.476773,279.862607 C335.754332,280.670304 336.51415,281.212629 337.368207,281.212629 C546.554387,281.212629 615.658742,281.212629 544.681269,281.212629"
            id="pulsepath"
            stroke="#FFFFFF"
            strokeWidth="10"
          />
        </g>
      </g>
    </svg>
  );
}

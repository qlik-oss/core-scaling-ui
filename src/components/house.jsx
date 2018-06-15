import React from "react";
import PropTypes from "prop-types";
import "./house.css";

export default function House(props) {
  if (!props.show) {
    return null;
  }
  return (
    <svg
      className="house"
      width="264px"
      height="264px"
      viewBox="0 0 264 264"
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
          id="First-page-urbanization-Copy-12"
          transform="translate(-314.000000, -703.000000)"
        >
          <g id="Group-3" transform="translate(314.000000, 703.000000)">
            <circle
              id="Oval-3"
              stroke="#FFFFFF"
              strokeWidth="5"
              fill="#B8DDF2"
              cx="132"
              cy="132"
              r="127.5"
            />
            <g id="House-1" transform="translate(90.000000, 22.000000)">
              <rect
                id="Main-building"
                fill="#6F6F6F"
                x="0"
                y="51"
                width="82"
                height="147"
              />
              <rect
                id="Penthouse-floor"
                fill="#6F6F6F"
                x="9"
                y="28"
                width="63"
                height="25"
              />
              <rect
                id="Top-level"
                fill="#6F6F6F"
                x="20"
                y="24"
                width="42"
                height="4"
              />
              <g
                id="sixth-floor-windows"
                transform="translate(8.000000, 64.000000)"
                fill="#D8D8D8"
              >
                <rect
                  id="Rectangle-11"
                  x="25"
                  y="0"
                  width="18"
                  height="13"
                  className="slowLight"
                />
                <rect id="Rectangle-11" x="49" y="0" width="18" height="13" />
                <rect
                  id="Rectangle-11"
                  x="0"
                  y="0"
                  width="18"
                  height="13"
                  fill="#7FAFCA"
                />
              </g>
              <g
                id="fifth-floor-windows"
                transform="translate(8.000000, 84.000000)"
                fill="#D8D8D8"
              >
                <rect
                  id="Rectangle-11"
                  x="25"
                  y="0"
                  width="18"
                  height="13"
                  className="slowLight"
                />
                <rect
                  id="Rectangle-11"
                  x="49"
                  y="0"
                  width="18"
                  height="13"
                  className="fasterLight"
                />
                <rect
                  id="Rectangle-11"
                  x="0"
                  y="0"
                  width="18"
                  height="13"
                  className="fastLight"
                />
              </g>
              <g
                id="fourth-floor-windows"
                transform="translate(8.000000, 103.000000)"
                fill="#D8D8D8"
              >
                <rect
                  id="Rectangle-11"
                  x="25"
                  y="0"
                  width="18"
                  height="13"
                  className="slowerLight"
                />
                <rect
                  id="Rectangle-11"
                  x="49"
                  y="0"
                  width="18"
                  height="13"
                  className="slowLightDown"
                />
                <rect
                  id="Rectangle-11"
                  x="0"
                  y="0"
                  width="18"
                  height="13"
                  className="fastLight"
                />
              </g>
              <g
                id="third-floor-windows-"
                transform="translate(8.000000, 123.000000)"
                fill="#D8D8D8"
              >
                <rect
                  id="Rectangle-11"
                  x="0"
                  y="0"
                  width="18"
                  height="13"
                  className="fasterLightDown"
                />
                <rect
                  id="Rectangle-11"
                  x="25"
                  y="0"
                  width="18"
                  height="13"
                  className="slowerLightDown"
                />
                <rect
                  id="Rectangle-11"
                  x="49"
                  y="0"
                  width="18"
                  height="13"
                  className="slowerLight"
                />
              </g>
              <g
                id="second-floor-windows"
                transform="translate(8.000000, 143.000000)"
                fill="#D8D8D8"
              >
                <rect id="Rectangle-11" x="25" y="0" width="18" height="13" />
                <rect
                  id="Rectangle-11"
                  x="49"
                  y="0"
                  width="18"
                  height="13"
                  className="slowLightDown"
                />
                <rect id="Rectangle-11" x="0" y="0" width="18" height="13" />
              </g>
              <g
                id="first-floor-windows"
                transform="translate(8.000000, 163.000000)"
                fill="#D8D8D8"
                className="fastLight"
              >
                <rect id="Rectangle-11" x="25" y="0" width="18" height="13" />
                <rect id="Rectangle-11" x="49" y="0" width="18" height="13" />
                <rect id="Rectangle-11" x="0" y="0" width="18" height="13" />
              </g>
              <g
                id="Floor-lvl-window"
                transform="translate(8.000000, 183.000000)"
                fill="#D8D8D8"
              >
                <rect id="Rectangle-11" x="0" y="0" width="42" height="13" />
              </g>
              <g
                id="Penthouse-windows"
                transform="translate(13.000000, 34.000000)"
                fill="#D8D8D8"
              >
                <rect
                  id="Rectangle-12"
                  x="0"
                  y="0"
                  width="10.8035714"
                  height="11"
                  className="slowLight"
                />
                <rect
                  id="Rectangle-12"
                  x="14.7321429"
                  y="0"
                  width="10.8035714"
                  height="11"
                  fill="#7FAFCA"
                />
                <rect
                  id="Rectangle-12"
                  x="29.4642857"
                  y="0"
                  width="10.8035714"
                  height="11"
                  className="slowerLight"
                />
                <rect
                  id="Rectangle-12"
                  x="44.1964286"
                  y="0"
                  width="10.8035714"
                  height="11"
                />
              </g>
              <polygon
                id="Antenna"
                fill="#6F6F6F"
                points="40.7972656 0 41.2982422 0 42 25 40 25"
              />
              <rect
                id="Rectangle-14"
                fill="#D8D8D8"
                x="58"
                y="183"
                width="9"
                height="15"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

House.propTypes = {
  show: PropTypes.bool.isRequired
};

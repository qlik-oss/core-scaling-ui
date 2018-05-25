import React from "react";
import PropTypes from "prop-types";
import Text from "react-svg-text";
import "./banner.css";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slideCount: 0
    };
  }

  // Setting style on dummy element used for svg text measurements by react-svg-text.
  componentDidMount() {
    const textEl = document.getElementById("__react_svg_text_measurement_id");
    if (textEl) {
      textEl.parentElement.style.position = "absolute";
      textEl.parentElement.style.left = "-999em";
    }
  }

  dotClick = index => {
    this.setState({ slideCount: index });
  };

  interval = setInterval(() => {
    this.setState({
      slideCount: this.state.slideCount < 2 ? this.state.slideCount + 1 : 0
    });
  }, 15000);

  render() {
    const dotsGroup = this.props.text.map((text, i) => {
      const position = 6 + i * 18;
      const color = this.state.slideCount === i ? "#FFFFFF" : "#D8D8D8";
      return (
        <circle
          key={text.id}
          fill={color}
          cx={position}
          cy="6"
          r="6"
          onClick={() => this.dotClick(i)}
        />
      );
    });

    const textGroup = this.props.text.map((text, i) => {
      if (this.state.slideCount === i) {
        return (
          <Text
            key={text.id}
            x="24"
            y="100"
            dx="0"
            dy="0"
            verticalAnchor="start"
            textAnchor="middle"
            width="320"
            fill="#fff"
            className="cloudText"
          >
            {text.text}
          </Text>
        );
      }
      return null;
    });

    return (
      <svg
        className="banner"
        width="485px"
        height="180px"
        viewBox="0 0 485 235"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            d="M8,0 L473,-8.8817842e-16 C477.418278,-1.69980292e-15 481,3.581722 481,8 L481,197.798498 C481,201.892316 477.909418,205.32558 473.838128,205.754473 L243.899414,229.977539 L7.18498918,205.735809 C3.10362553,205.31784 5.02404285e-14,201.880142 4.97379915e-14,197.777432 L0,8 C-5.41083001e-16,3.581722 3.581722,-7.65539184e-17 8,-8.8817842e-16 Z"
            id="path-1"
          />
          <filter
            x="-0.7%"
            y="-1.1%"
            width="101.9%"
            height="104.3%"
            filterUnits="objectBoundingBox"
            id="filter-2"
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
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          opacity="0.921648551"
        >
          <g
            id="First-page-urbanization-Copy-11"
            transform="translate(-1301.000000, -32.000000)"
          >
            <g
              id="infotickerbanner"
              transform="translate(1302.000000, 32.000000)"
            >
              <g id="background">
                <use
                  fill="black"
                  fillOpacity="1"
                  filter="url(#filter-2)"
                  xlinkHref="#path-1"
                />
                <use
                  fill={this.props.color}
                  fillRule="evenodd"
                  xlinkHref="#path-1"
                />
              </g>
              <path
                d="M242.854425,213.428613 L457.703328,191.731779 C461.278786,191.370706 464,188.360846 464,184.767202 L464,30 C464,26.1340068 460.865993,23 457,23 L24,23 C20.1340068,23 17,26.1340068 17,30 L17,184.752094 C17,188.351301 19.7293974,191.36392 23.3111345,191.718116 L242.854425,213.428613 Z"
                id="whiteframe"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <g id="dots" transform="translate(218, 168)" className="dots">
                {dotsGroup}
              </g>
            </g>
          </g>
        </g>
        {textGroup}
      </svg>
    );
  }
}

Banner.propTypes = {
  text: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired
};

export default Banner;

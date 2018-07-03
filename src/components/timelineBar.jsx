import React from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import "./timelineBar.css";

const labelWidth = 32;
class TimelineBar extends React.Component {
  constructor(props) {
    super(props);
    const { visibleWidth, totalWidth } = this.props;
    this.state = {
      position: 0,
      maxPosition: Math.min(visibleWidth - totalWidth, 0)
    };
  }

  componentWillMount() {
    document.body.addEventListener("keyup", this.handleKeyUp);
  }

  componentDidMount() {
    const { items, visibleWidth, startIndex } = this.props;
    const position = items[startIndex].key * 60;
    this.scrollTo(-position + visibleWidth / 2);
  }

  componentWillReceiveProps(newProps) {
    const { items, visibleWidth } = this.props;
    const { position } = this.state;
    const selectedItemPosition = items[newProps.startIndex].key * 60;
    if (selectedItemPosition < -position) {
      this.scrollTo(-selectedItemPosition + visibleWidth / 2);
    } else if (selectedItemPosition > -position + visibleWidth) {
      this.scrollTo(position - visibleWidth + labelWidth);
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener("keyup", this.handleKeyUp);
  }

  handleClick = direction => {
    const { visibleWidth } = this.props;
    const { position } = this.state;
    if (direction === "next") {
      this.scrollTo(position - visibleWidth + labelWidth);
    } else {
      this.scrollTo(position + visibleWidth - labelWidth);
    }
  };

  scrollTo = position => {
    const { visibleWidth, totalWidth } = this.props;
    const maxPosition = Math.min(visibleWidth - totalWidth, 0);
    this.setState({
      position: Math.max(Math.min(0, position), maxPosition),
      maxPosition
    });
  };

  render() {
    const { items, width } = this.props;
    const { position, maxPosition } = this.state;
    const prevButtonEnabled = position < 0 ? "enabled" : "disabled";
    const nextButtonEnabled = position > maxPosition ? "enabled" : "disabled";
    return (
      <div className="outer" style={{ width: `${width}px` }}>
        <div className="wrapper">
          <Motion
            style={{
              X: spring(position, {
                stiffness: 150,
                damping: 25
              })
            }}
          >
            {({ X }) => (
              <div
                className="timeline"
                style={{
                  WebkitTransform: `translate3d(${X}, 0, 0)px`,
                  transform: `translate3d(${X}px, 0, 0)`
                }}
              >
                <ol>
                  {items}
                </ol>
              </div>
            )}
          </Motion>
        </div>
        <div className="navigation">
          <ul className="navigationButtons">
            <li
              className={`navPrev ${prevButtonEnabled}`}
              onClick={() => this.handleClick("prev")}
            />
            <li
              className={`navNext ${nextButtonEnabled}`}
              onClick={() => this.handleClick("next")}
            />
          </ul>
        </div>
      </div>
    );
  }
}

TimelineBar.propTypes = {
  items: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  totalWidth: PropTypes.number.isRequired,
  visibleWidth: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired
};

export default TimelineBar;

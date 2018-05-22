import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import './timelineBar.css';

const labelWidth = 32;
class TimelineBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      maxPosition: Math.min(this.props.visibleWidth - this.props.totalWidth, 0),
    };
  }

  componentWillMount() {
    document.body.addEventListener('keyup', this.handleKeyUp);
  }

  componentDidMount() {
    const position = this.props.items[this.props.startIndex].key * 60;
    this.scrollTo(-position + this.props.visibleWidth / 2);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.handleKeyUp);
  }

  handleClick = (direction) => {
    if (direction === 'next') {
      this.scrollTo(this.state.position - this.props.visibleWidth + labelWidth);
    } else {
      this.scrollTo(this.state.position + this.props.visibleWidth - labelWidth);
    }
  };

  scrollTo = (position) => {
    const maxPosition = Math.min(this.props.visibleWidth - this.props.totalWidth, 0);
    this.setState({
      position: Math.max(Math.min(0, position), maxPosition),
      maxPosition,
    });
  };

  render() {
    const prevButtonEnabled = this.state.position < 0 ? 'enabled' : 'disabled';
    const nextButtonEnabled = this.state.position > this.state.maxPosition ? 'enabled' : 'disabled';
    return (
      <div className="outer" style={{ width: `${this.props.width}px` }}>
        <div className="wrapper">
          <Motion
            style={{
              X: spring(this.state.position, {
                stiffness: 150,
                damping: 25,
              }),
            }}
          >
            {({ X }) => (
              <div
                className="timeline"
                style={{
                  WebkitTransform: `translate3d(${X}, 0, 0)px`,
                  transform: `translate3d(${X}px, 0, 0)`,
                }}
              >
                <ol>{this.props.items}</ol>
              </div>
            )}
          </Motion>
        </div>
        <div className="navigation">
          <ul className="navigationButtons">
            <li
              className={`navPrev ${prevButtonEnabled}`}
              onClick={() => this.handleClick('prev')}
            />
            <li
              className={`navNext ${nextButtonEnabled}`}
              onClick={() => this.handleClick('next')}
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
  startIndex: PropTypes.number.isRequired,
};

export default TimelineBar;

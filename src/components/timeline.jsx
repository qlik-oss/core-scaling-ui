import React from 'react';
import PropTypes from 'prop-types';
import TimelineBar from './timelineBar';

export default function Timeline(props) {
  const visibleWidth = props.width;
  const totalWidth = Math.max(props.items[props.items.length - 1].key * 60 + 100, visibleWidth);
  return (
    <TimelineBar
      items={props.items}
      width={props.width}
      totalWidth={totalWidth}
      visibleWidth={visibleWidth}
      startIndex={props.startIndex}
    />
  );
}

Timeline.propTypes = {
  width: PropTypes.number,
  items: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
};

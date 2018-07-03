import React from "react";
import PropTypes from "prop-types";
import TimelineBar from "./timelineBar";
import "../containers/firstSection.css";

export default function Timeline(props) {
  const { width, items, startIndex } = props;
  const visibleWidth = width;
  const totalWidth = Math.max(
    items[items.length - 1].key * 60 + 100,
    visibleWidth
  );
  return (
    <TimelineBar
      items={items}
      width={width}
      totalWidth={totalWidth}
      visibleWidth={visibleWidth}
      startIndex={startIndex}
    />
  );
}

Timeline.propTypes = {
  width: PropTypes.number,
  items: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired
};

Timeline.defaultProps = {
  width: 0
};

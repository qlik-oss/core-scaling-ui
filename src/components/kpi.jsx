import React from 'react';
import PropTypes from 'prop-types';
import styles from './kpi.css';

export default function KPI(props) {
  return (
    <div className={styles.kpiContainer}>
      <svg viewBox="0 0 200 200" preserveAspectRatio="xMinYMin meet">
        <g>
          <circle r="60" cx="100" cy="100" fill="#d3d3d3" />
          <text x="50%" y="50%" textAnchor="middle" dy="0.3em" fill="#696969">
            {props.nbr}
          </text>
        </g>
      </svg>
    </div>
  );
}

KPI.propTypes = {
  nbr: PropTypes.string,
  // text: PropTypes.string,
};

KPI.defaultProps = {
  nbr: '',
  // text: '',
};

import React from 'react';
import PropTypes from 'prop-types';
import styles from '../containers/app.css';

export default function Drawer(props) {
  return (
    <a href={props.linkTo}>
      <span className={styles.next}>{props.title}</span>
    </a>
  );
}

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

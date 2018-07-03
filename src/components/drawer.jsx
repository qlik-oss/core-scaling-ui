import React from "react";
import PropTypes from "prop-types";
import styles from "../containers/app.css";

export default function Drawer(props) {
  const { linkTo, title } = props;
  return (
    <a href={linkTo}>
      <span className={styles.next}>
        {title}
      </span>
    </a>
  );
}

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired
};

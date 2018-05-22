import React from "react";
import PropTypes from "prop-types";
import "./header.css";

export default function Header(props) {
  return (
    <div className="header">
      <button
        onClick={() => {
          props.onClick("urbanization");
        }}
      />
      <button
        onClick={() => {
          props.onClick("lifeexpectancy");
        }}
      />
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

import React from "react";
import PropTypes from "prop-types";
import "./header.css";
import houseImg from "../resources/house.svg";
import heartImg from "../resources/heart.svg";

export default function Header(props) {
  return (
    <div className="header">
      <button
        title="Urbanization"
        className={`headerButton ${
          props.activePage === "Urbanization" ? "active" : ""
        }`}
        onClick={() => {
          props.onClick("urbanization");
        }}
      >
        <img
          className="buttonImage"
          src={houseImg}
          alt="Urbanization button"
        />
      </button>
      <button
        title="Life Expectancy"
        className={`headerButton ${
          props.activePage === "Life Expectancy" ? "active" : ""
        }`}
        onClick={() => {
          props.onClick("lifeexpectancy");
        }}
      >
        <img
          className="buttonImage"
          src={heartImg}
          alt="Life Expectancy button"
        />
      </button>
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired
};

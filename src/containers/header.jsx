import React from "react";
import PropTypes from "prop-types";
import "./header.css";
import houseImg from "../resources/whitehouse_trans.svg";
import heartImg from "../resources/heart.svg";
import qlikCoreImg from "../resources/QlikCoreLogo.svg";

export default function Header(props) {
  const { onClick, activePage } = props;
  return (
    <div className="header">
      <img
        className="coreLogo"
        src={qlikCoreImg}
        alt="Qlik Core Logo"
        onClick={() => {
          window.open("https://core.qlik.com/use-cases/#african-urbanization");
        }}
      />
      <button
        title="Urbanization"
        className={`headerButton ${
          activePage === "Urbanization" ? "active" : ""
        }`}
        type="submit"
        onClick={() => {
          onClick("urbanization");
        }}
      >
        <img className="buttonImage" src={houseImg} alt="Urbanization button" />
      </button>
      <button
        title="Life Expectancy"
        className={`headerButton ${
          activePage === "Life Quality" ? "active" : ""
        }`}
        type="submit"
        onClick={() => {
          onClick("lifeexpectancy");
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

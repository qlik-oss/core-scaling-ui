import React from "react";
import PropTypes from "prop-types";
import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div
          title="Urbanization"
          className={`headerButton ${
            this.props.activePage === "Urbanization" ? "active" : ""
          }`}
          onClick={() => {
            this.props.onClick("urbanization");
          }}
        >
          <img className="buttonImage" src="src/resources/house.svg" />
        </div>
        <div
          title="Life Expectancy"
          className={`headerButton ${
            this.props.activePage === "Life Expectancy" ? "active" : ""
          }`}
          onClick={() => {
            this.props.onClick("lifeexpectancy");
          }}
        >
          <img className="buttonImage" src="src/resources/heart.svg" />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Header;

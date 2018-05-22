import React from 'react';
import Text from 'react-svg-text';
import './filterbox.css';

class Filterbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    }
  }

  selectCountry = (index) => {
    this.props.model.clearSelections('/qHyperCubeDef');
    this.props.model.selectHyperCubeValues('/qHyperCubeDef', 0, [index], false);
    this.setState({selected: index});
  };

  clearSelection = () => {
    this.props.model.clearSelections('/qHyperCubeDef');
    this.setState({selected: null});
  };

  render() {
    const countries = this.props.layout.qHyperCube.qDataPages[0].qMatrix.map((country, i) => {
      return (  
        <div onClick={() => this.selectCountry(i)} key={i} title={country[0].qText}>
          <span className="listText">{country[0].qText}</span>
          <span className="listIcon">{i === this.state.selected ? '✔' : null}</span>
        </div>
      )
    });

    return (
      <div className="filterbox">
        <div className="title">Country</div>
        <div className="list">
          {countries}
        </div>
        <div className="clearSelection" onClick={() => this.clearSelection()}>
          <span>Clear selection</span>
          <span>✖</span>
        </div>
      </div>
    );
  }
}

export default Filterbox;
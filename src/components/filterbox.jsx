import React from 'react';
import Text from 'react-svg-text';
import styles from './filterbox.css';

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
          <span className={styles.listText}>{country[0].qText}</span>
          <span className={styles.listIcon}>{i === this.state.selected ? '✔' : null}</span>
        </div>
      )
    });

    return (
      <div className={styles.filterbox}>
        <div className={styles.title}>Country</div>
        <div className={styles.list}>
          {countries}
        </div>
        <div className={styles.clearSelection} onClick={() => this.clearSelection()}>
          <span>Clear selection</span>
          <span>✖</span>
        </div>
      </div>
    );
  }
}

export default Filterbox;
import React from 'react';
import PropTypes from 'prop-types';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  handleHashChange = () => {
    const isActive = window.location.href.indexOf(this.props.linkTo) > -1;
    if (this.state !== isActive) {
      this.setState({ active: isActive });
    }
  };

  render() {
    return (
      <a className={this.state.active ? 'active' : 'no'} href={this.props.linkTo}>
        {this.props.title}
      </a>
    );
  }
}

Link.propTypes = {
  title: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

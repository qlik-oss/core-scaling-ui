import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
        const msg =
          error instanceof Event
            ? "Failed to establish a connection to an Engine"
            : error.message;
        return (
          <div className="errorWrapper">
            <span className="errorText">Oops, something went wrong.</span>
            <span>{msg}</span>
          </div>
        );
      }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

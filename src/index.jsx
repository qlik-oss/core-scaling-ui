import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';
import ErrorBoundary from './components/error-boundary';

ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('index'));

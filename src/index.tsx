import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

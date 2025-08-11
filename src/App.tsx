import React from 'react';
import './App.scss';

import { Navbar } from './components/Navbar';
import { Routers } from './Routers';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routers />
        </div>
      </div>
    </div>
  );
};

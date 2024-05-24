import './App.scss';
import React from 'react';
import Navbar from './components/Navbar';
import Router from './components/Routes/Router';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Router />
        </div>
      </div>
    </div>
  );
};

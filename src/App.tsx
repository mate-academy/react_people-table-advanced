import React from 'react';
// Components
import { Navbar } from './components/Navbar';
import AppRouting from './App.routing';
// Styles
import './App.scss';

export const App:React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <AppRouting />
        </div>
      </div>
    </div>
  );
};

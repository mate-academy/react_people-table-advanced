import React from 'react';
import { Navbar } from './components/Navbar';
import AppRouting from './App.routing';
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

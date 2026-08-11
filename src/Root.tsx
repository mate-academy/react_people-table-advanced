import React from 'react';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

export const Root: React.FC = () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

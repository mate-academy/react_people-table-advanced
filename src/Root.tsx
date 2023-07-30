import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './components/ErrorPage';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);

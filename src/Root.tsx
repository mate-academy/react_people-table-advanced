import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import React from 'react';
import { HomePage } from './pages/PeoplePage/HomePage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage/PeoplePage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);

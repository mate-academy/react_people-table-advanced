import React from 'react';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from '../../App';
import { PeoplePage } from '../PeoplePage';
import { NotFoundPage } from '../NotFoundPage';
import { HomePage } from '../HomePage';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to=".." replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

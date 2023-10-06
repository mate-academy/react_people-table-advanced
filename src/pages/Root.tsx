import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { App } from '../App';
import { Home } from './Home';
import { NotFoundPage } from './NotFoundPage';
import { People } from './People';

export const Root: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<People />} />

          <Route path=":slug" element={<People />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

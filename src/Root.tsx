import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { App } from './App';

import { PeoplePage } from './components/PeoplePage';
import { ErrorPage } from './components/ErrorPage';
import { HomePage } from './components/HomePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="*" element={<ErrorPage />} />

          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":peopleSlug" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

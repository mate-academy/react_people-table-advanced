import { PeoplePage } from './components/pages/PeoplePage';
import { Navbar } from './components/navbar/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import {
  alternateHomePath,
  homePath,
  peoplePath,
  peopleWithSlugPath,
} from './consts/paths';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path={homePath} element={<HomePage />} />
          <Route
            path={alternateHomePath}
            element={<Navigate to={homePath} replace />}
          />
          <Route path={peoplePath}>
            <Route index element={<PeoplePage />} />
            <Route path={peopleWithSlugPath} element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

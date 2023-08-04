import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <Routes>
      <Route path="/">
        <Route path="*" element={<PageNotFound />} />
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </div>
);

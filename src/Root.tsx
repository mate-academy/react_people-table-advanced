import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import HomePage from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

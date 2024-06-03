import { Navbar } from './components/Navbar/Navbar';

import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

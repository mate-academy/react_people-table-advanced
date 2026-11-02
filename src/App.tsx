import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <section style={{ paddingTop: '3.25rem' }}>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people/:slug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </section>
    </div>
  );
};

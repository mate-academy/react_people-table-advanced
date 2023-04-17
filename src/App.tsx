import { Routes, Route, Navigate } from 'react-router-dom';

import { PeoplePage } from './components/PeoplePage';
import { MainNav } from './components/MainNav';
import { NotFoundPage } from './components/NotFoundPage';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <MainNav />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":selectedPersonSlug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

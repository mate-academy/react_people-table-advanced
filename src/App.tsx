import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

import { Navbar } from './components/Navbar/Navbar';

import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPafe';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="/people" element={<PeoplePage />}>
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

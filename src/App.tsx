import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route path="/people" element={<PeoplePage />}>
              <Route path=":personHref" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

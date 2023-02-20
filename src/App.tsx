import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/Navigation/Navbar';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PgaeNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/home"
              element={
                <Navigate to="/" />
              }
            />

            <Route
              path="/people"
              element={
                <PeoplePage />
              }
            />

            <Route
              path="/people/:slug"
              element={<PeoplePage />}
            />

            <Route
              path="*"
              element={<PageNotFound />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

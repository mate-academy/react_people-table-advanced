import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="title">Home Page</h1>
              }
            />
            <Route
              path="/home"
              element={
                <Navigate to="/" replace />
              }
            />
            <Route
              path="/people"
              element={
                <PeoplePage />
              }
            />
            <Route
              path="/people/:personSlug"
              element={
                <PeoplePage />
              }
            />
            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
          </Routes>

        </div>
      </div>
    </div>
  );
};

import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/home"
              element={<Navigate to="/" replace />}
            />

            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            />

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />

            <Route path="/people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

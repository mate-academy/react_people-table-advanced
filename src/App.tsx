import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <Navbar />
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route
            path="/home"
            element={(
              <Navigate
                to="/"
                replace
              />
            )}
          />
          <Route
            path="/"
            element={
              <h1 className="title">Home Page</h1>
            }
          />

          <Route path="people">
            <Route
              index
              element={
                <PeoplePage />
              }
            />
            <Route
              path=":personSlug"
              element={
                <PeoplePage />
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <h1 className="title">Page not found</h1>
            }
          />
        </Routes>
      </div>
    </main>
  </div>
);

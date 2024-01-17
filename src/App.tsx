import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              index
              element={<HomePage />}
            />
            <Route path="people">
              <Route
                path=":slug?"
                element={<PeoplePage />}
              />
            </Route>

            <Route
              path="home"
              element={(
                <Navigate
                  to="/"
                  replace
                />
              )}
            />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

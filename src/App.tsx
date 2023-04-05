import { Route, Routes, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PageTitle } from './components/PageTitle';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<PageTitle title="Home Page" />}
            />
            <Route path="people">
              <Route
                index
                element={(
                  <>
                    <PeoplePage />
                  </>
                )}
              />
              <Route
                path=":personId"
                element={(
                  <>
                    <PeoplePage />
                  </>
                )}
              />
            </Route>
            <Route
              path="*"
              element={
                <PageTitle title="Page not found" />
              }
            />
            <Route
              path="home"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

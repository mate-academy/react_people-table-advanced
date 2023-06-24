import { FC } from 'react';
import {
  Navigate, Route, Routes, useMatch,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import { Navbar } from './components/Navbar';

export const App: FC = () => {
  const match = useMatch('/people/:slug');

  return (
    <>
      <div data-cy="app">
        <Navbar />

        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="people">
                <Route
                  index
                  element={(
                    <>
                      <PeoplePage slugPerson={match?.params.slug} />
                    </>
                  )}
                />
                <Route
                  path=":slugPerson"
                  element={(
                    <>
                      <PeoplePage slugPerson={match?.params.slug} />
                    </>
                  )}
                />
              </Route>
              <Route
                path="*"
                element={(
                  <>
                    <h1 className="title">Page not found</h1>
                  </>
                )}
              />
            </Routes>
          </div>
        </main>
      </div>

    </>
  );
};

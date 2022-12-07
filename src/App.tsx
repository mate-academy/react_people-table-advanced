import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from './components/Navbar';
import './App.scss';
import { slugContext } from './components/slugContext';
import { PeoplePage } from './components/Pages/PeoplePage';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const App = () => {
  const [selectedSlug, setSelectedSlug] = useState('');

  return (
    <slugContext.Provider value={{ selectedSlug, setSelectedSlug }}>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={(
                  <HomePage />
                )}
              />
              <Route
                path="home"
                element={<Navigate to="/" replace />}
              />
              <Route path="/people">
                <Route
                  index
                  element={<PeoplePage />}
                />
                <Route
                  path=":slug"
                  element={<PeoplePage />}
                />
              </Route>
              <Route
                path="*"
                element={(
                  <NotFoundPage />
                )}
              />
            </Routes>
          </div>
        </div>
      </div>
    </slugContext.Provider>
  );
};

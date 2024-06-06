import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { PeopleProvider } from './providers/PeopleProvider';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/people">
              <Route
                index
                element={
                  <PeopleProvider>
                    <PeoplePage />
                  </PeopleProvider>
                }
              />
              <Route
                path=":slug"
                element={
                  <PeopleProvider>
                    <PeoplePage />
                  </PeopleProvider>
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

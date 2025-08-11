import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';
import { RoutesItems } from './types/Router';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path={RoutesItems.Home} element={<HomePage />} />
            <Route
              path={RoutesItems.RedirectHome}
              element={<Navigate to={RoutesItems.Home} replace />}
            />
            <Route path={RoutesItems.PeopleDetail} element={<PeoplePage />} />
            <Route path={RoutesItems.People} element={<PeoplePage />} />
            <Route path={RoutesItems.NotFound} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

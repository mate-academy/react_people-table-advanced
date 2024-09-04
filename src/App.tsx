import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';
import { RoutesEnum } from './types/Router';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path={RoutesEnum.Home} element={<HomePage />} />
            <Route
              path={RoutesEnum.RedirectHome}
              element={<Navigate to={RoutesEnum.Home} replace />}
            />
            <Route path={RoutesEnum.PeopleDetail} element={<PeoplePage />} />
            <Route path={RoutesEnum.People} element={<PeoplePage />} />
            <Route path={RoutesEnum.NotFound} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

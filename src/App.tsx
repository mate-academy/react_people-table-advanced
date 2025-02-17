import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navigation } from './components/Navigation/Navigation';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { NotFound } from './components/NotFound/NotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <div className="section">
        <div className="container">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<Navigate to="/" replace={true} />} path="/home" />
            <Route path="/people">
              <Route path=":selectedPerson?" element={<PeoplePage />} />
            </Route>
            <Route element={<NotFound />} path="*" />
          </Routes>
        </div>
      </div>
    </div>
  );
};

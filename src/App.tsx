import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';

import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/home"
              element={
                <Navigate
                  to={{ pathname: '/', search: location.search }}
                  replace
                />
              }
            ></Route>
            <Route path="/people/:personSlug?" element={<PeoplePage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

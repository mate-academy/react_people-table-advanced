import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { PageNotFound } from './components/PageNotFound';
import { NavigateHome } from './components/NavigateHome';
import { PeoplePage } from './components/PeoplePage';
import { Routes, Route, Outlet } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<NavigateHome />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

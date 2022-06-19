import React from 'react';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
} from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage';
import NewPerson from './components/NewPerson';
import PeoplePage from './components/PeoplePage';
import DataProvider from './context/DataProvider';

const App: React.FC = () => (
  <BrowserRouter>
    <h1>People table</h1>
    <nav className="navbar">
      <NavLink
        to="/"
        // eslint-disable-next-line
        className={({ isActive }) =>
        // eslint-disable-next-line
          isActive ? 'navbar__link--active' : 'navbar__link'}
      >
        Home Page
      </NavLink>
      <NavLink
      // eslint-disable-next-line
        className={({ isActive }) =>
        // eslint-disable-next-line
          isActive ? 'navbar__link--active' : 'navbar__link'}
        to="/peoplePage"
      >
        People Page
      </NavLink>
    </nav>
    <DataProvider>
      <Routes>
        <Route
          element={<HomePage />}
          path="/"
        />
        <Route
          element={<PeoplePage />}
          path="/peoplePage"
        >
          <Route
            element={<NewPerson />}
            path="new"
          />
        </Route>
        <Route
          element={<PeoplePage />}
          path="/peoplePage/:personSlug"
        />
      </Routes>
    </DataProvider>
  </BrowserRouter>
);

export default App;

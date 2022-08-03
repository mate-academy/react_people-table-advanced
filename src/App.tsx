import 'bulma/css/bulma.css';
import './App.scss';
import {
  Routes, Route, Navigate, NavLink,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './PeoplePage';
import { Home } from './Home';
import { NotFoundPage } from './NotFoundPage';

type Status = { isActive: boolean };

const getActiveClass = (status: Status) => classNames(
  'nav-bar-item',
  'Nav__link',
  'Nav',
  { 'has-background-grey-lighter': status.isActive },
);

export const App = () => {
  return (
    <>
      <header className="Header">
        <nav className="Nav">
          <NavLink to="/" className={getActiveClass}>Home</NavLink>
          <NavLink to="/people" className={getActiveClass}>People</NavLink>
        </nav>
      </header>

      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={<Navigate to="/" />}
          />
          <Route path="/people">
            <Route index element={(<PeoplePage />)} />
            <Route path=":personSlug" element={(<PeoplePage />)} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import {
  Navigate, NavLink, Route, Routes, useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { PeoplePage } from './components/PeoplePage';

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  'navbar-item',
  { 'has-background-grey-lighter': status.isActive },
);

export const App = () => {
  const location = useLocation();

  return (
    <>
      <nav
        className="navbar is-fixed-top has-background-light"
        data-cy="nav"
      >
        <div className="navbar-menu container">
          <div className="navbar-start">
            <NavLink to="/" className={getActiveClasses}>
              Home
            </NavLink>

            <NavLink
              to={{
                pathname: 'people',
                search: location.search,
              }}
              className={getActiveClasses}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};

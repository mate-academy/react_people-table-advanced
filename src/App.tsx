import './App.scss';
import {
  NavLink,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import classNames from 'classnames';
import { People } from './components/People/PeopleList';
import { useEffect } from 'react';

export const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/home') {
      return navigate('/');
    }
  }, []);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink
              to="/"
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/people"
              className={({ isActive }) =>
                classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                })
              }
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<h1 className="title">Home Page</h1>}
            ></Route>
            <Route path="/people/:id?" element={<People />}></Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            ></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

import './App.scss';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

const People = () => {
  return (
    <>
      <PeoplePage />
    </>
  );
};

export const App = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

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
            <Link
              className={
                location.pathname === '/'
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to={'/'}
            >
              Home
            </Link>
            <Link
              className={
                location.pathname.startsWith('/people')
                  ? 'navbar-item has-background-grey-lighter'
                  : 'navbar-item'
              }
              to={{
                pathname: `/people`,
                search: searchParams.toString()
                  ? `?${searchParams.toString()}`
                  : '',
              }}
            >
              People
            </Link>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people" element={<People />} />
            <Route path="/people/:slug" element={<People />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

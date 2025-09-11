import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const getClass = (path: string) =>
    `navbar-item ${isActive(path) ? 'is-active has-background-grey-lighter' : ''}`;

  return (
    <nav
      className="navbar is-light is-fixed-top is-mobile has-shadow"
      data-cy="nav"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className={getClass('/')}>
            Home
          </Link>
          <Link to="/people" className={getClass('/people')}>
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

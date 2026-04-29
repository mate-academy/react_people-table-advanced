import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav data-cy="nav" className="navbar is-light px-3">
      <div className="navbar-brand">
        <Link
          to="/"
          className={`navbar-item ${
            pathname === '/' ? 'has-background-grey-lighter' : ''
          }`}
        >
          Home
        </Link>
        <Link
          to="/people"
          className={`navbar-item ${
            pathname.includes('/people') ? 'has-background-grey-lighter' : ''
          }`}
        >
          People
        </Link>
      </div>
    </nav>
  );
};

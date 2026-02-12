import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            href="#/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
          >
            Home
          </a>

          <a
            className={`navbar-item ${location.pathname === '/people' ? 'has-background-grey-lighter' : ''}`}
            href="#/people"
            aria-current={location.pathname === '/people' ? 'page' : undefined}
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};

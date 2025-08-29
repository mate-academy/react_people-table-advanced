import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

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
            className={`navbar-item ${path === '/' ? 'has-background-grey-lighter' : ''}`}
            href="#/"
          >
            Home
          </a>

          <a
            aria-current={path.includes('/people') ? 'page' : undefined}
            className={`navbar-item ${path.includes('/people') ? 'has-background-grey-lighter' : ''}`}
            href="#/people"
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};

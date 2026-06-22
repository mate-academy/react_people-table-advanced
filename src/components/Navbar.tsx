import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname, search } = useLocation();

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
            className={`navbar-item${pathname === '/' ? ' has-background-grey-lighter' : ''}`}
            href="#/"
          >
            Home
          </a>

          <a
            className={`navbar-item${pathname.startsWith('/people') ? ' has-background-grey-lighter' : ''}`}
            href={`#/people${search}`}
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};

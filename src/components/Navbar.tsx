import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const search = searchParams.toString();
  const peopleLink = `/people${search ? `?${search}` : ''}`;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            className={`navbar-item ${pathname === '/' ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={`navbar-item ${
              pathname.startsWith('/people')
                ? 'has-background-grey-lighter'
                : ''
            }`}
            to={peopleLink}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

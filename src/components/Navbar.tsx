import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const isHomeActive = location.pathname === '/';
  const isPeopleActive = location.pathname.startsWith('/people');

  const peopleLink = isPeopleActive
    ? `/people?${searchParams.toString()}`
    : '/people';

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
            className={`navbar-item ${isHomeActive ? 'has-background-grey-lighter' : ''}`}
            to="/"
          >
            Home
          </Link>

          <Link
            className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
            to={peopleLink}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

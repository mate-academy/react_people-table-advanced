import { Link, useLocation } from 'react-router-dom';

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
        {/* <button onClick={() => console.log(location)}>dsadsadsa</button> */}
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'has-background-grey-lighter' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/people"
            className={`navbar-item ${location.pathname.includes('/people') ? 'has-background-grey-lighter' : ''}`}
            aria-current="page"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

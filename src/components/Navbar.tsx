import { NavLink, useLocation } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  let className = 'navbar-item';

  if (isActive) {
    // A NavLink ativa receberá esta classe CSS,
    // além do atributo `aria-current="page"` automaticamente.
    className += ' has-background-grey-lighter';
  }

  return className;
};

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
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: location.pathname.startsWith('/people') ? location.search : '',
            }}
            className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

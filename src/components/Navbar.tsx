import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const navLinkActive = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={navLinkActive}>
            Home
          </NavLink>
          <NavLink
            to={{ pathname: '/people', search: searchParams.toString() }}
            className={navLinkActive}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

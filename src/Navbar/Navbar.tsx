import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

const getNavLinkClasses = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const Navbar = () => {
  const [params] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getNavLinkClasses} to="/">
            Home
          </NavLink>

          <NavLink
            className={getNavLinkClasses}
            to={`/people?${params.toString()}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => (
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const Navbar = () => {
  const { search } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            className={getLinkClass}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            to={`/people${search}`}
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

const getLinkClasslist = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={getLinkClasslist} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClasslist}
            to={`/people${search}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

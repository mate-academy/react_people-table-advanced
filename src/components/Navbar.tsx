import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink to="/" className={getLinkClassName}>
            Home
          </NavLink>

          <NavLink to={`/people${search}`} className={getLinkClassName}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

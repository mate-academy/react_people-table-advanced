import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';

const getClassName = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar: React.FC = () => {
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
          <NavLink to="/" className={getClassName}>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            to={{ pathname: `/people`, search }}
            className={getClassName}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

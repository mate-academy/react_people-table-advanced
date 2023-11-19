import { NavLink } from 'react-router-dom';
import cn from 'classnames';

interface NavLinkProps {
  isActive?: boolean;
}

export const Navbar = () => {
  const getClass = ({ isActive }: NavLinkProps) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getClass} to="/">Home</NavLink>

          <NavLink
            aria-current="page"
            className={getClass}
            to="people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

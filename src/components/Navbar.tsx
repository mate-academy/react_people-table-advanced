import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const getLinkClass = ({ isActive }:{ isActive: boolean }) => {
    return cn('navbar-item', { 'has-background-grey-lighter': isActive });
  };

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
          <NavLink to="/" className={getLinkClass}>Home</NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to={`/people?${searchParams.toString()}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

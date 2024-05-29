import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const getActiveNavLink = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

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
          <NavLink className={getActiveNavLink} to="/">
            Home
          </NavLink>

          <NavLink
            className={getActiveNavLink}
            to={{ pathname: `people`, search: searchParams.toString() }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

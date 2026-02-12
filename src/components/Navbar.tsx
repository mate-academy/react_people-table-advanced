import { NavLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            to={{ pathname: '/people', search: search ? `?${search}` : '' }}
            className={getLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

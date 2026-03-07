import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSearchParamsContext } from '../store/SearchParamsContext';

const handleActiveLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  const { searchParams } = useSearchParamsContext();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={handleActiveLinkClass}>
            Home
          </NavLink>

          <NavLink
            to={{
              pathname: '/people',
              search: searchParams.toString(),
            }}
            aria-current="page"
            className={handleActiveLinkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

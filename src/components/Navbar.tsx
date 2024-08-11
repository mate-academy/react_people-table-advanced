import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav data-cy="nav" className="navbar is-fixed-top has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClass}
            to={{ pathname: '/people', search: searchParams.toString() }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

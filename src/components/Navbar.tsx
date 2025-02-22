import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const getActivePage = ({ isActive }: { isActive: boolean }) => {
  return cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

export const Navbar = () => {
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
          <NavLink className={getActivePage} to="/">
            Home
          </NavLink>

          <NavLink
            className={getActivePage}
            to={{
              pathname: '/people',
              search,
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

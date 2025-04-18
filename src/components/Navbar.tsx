import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });
};

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
          <NavLink className={getLinkClass} to="/">
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to={{
              pathname: 'people',
              search: `?${searchParams.toString()}`,
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

const getFocusedLink = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar-item', { 'has-background-grey-lighter': isActive },
);

export const NavBar = () => {
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
          <NavLink
            className={getFocusedLink}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getFocusedLink}
            to={{ search: searchParams.toString(), pathname: 'people' }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

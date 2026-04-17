import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-shadow
export const isActive = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

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
          <NavLink className={isActive} to="/" end>
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            to={{ pathname: '/people', search: searchParams.toString() }}
            className={isActive}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

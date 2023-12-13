import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item',
      { 'has-background-grey-lighter': isActive });
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
          <NavLink className={getNavClass} to="/">Home</NavLink>

          <NavLink
            aria-current="page"
            className={getNavClass}
            to={{
              pathname: 'people',
              search: searchParams.toString(),
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

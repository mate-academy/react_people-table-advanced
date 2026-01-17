import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClassName}>
            Home
          </NavLink>

          <NavLink
            to={`/people?${searchParams.toString()}`}
            className={getLinkClassName}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

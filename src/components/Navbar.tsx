import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

type Active = {
  isActive: boolean
};

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const linkClass = (active: Active) => classNames('navbar-item', {
    'has-background-grey-lighter': active.isActive,
  });
  const peopleLink = `people?${searchParams.toString()}`;

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
            to="/"
            className={linkClass}
          >
            Home
          </NavLink>

          <NavLink
            to={peopleLink}
            className={linkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const PageNavigation = () => {
  const getLinkClass = (
    { isActive }: { isActive: boolean },
  ) => classNames('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

  const [params] = useSearchParams();

  const allParams = params.toString();

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
            className={getLinkClass}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to={`/people?${allParams}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

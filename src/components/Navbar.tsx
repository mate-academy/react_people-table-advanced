import { useCallback } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const pages = ['Home', 'People'];

  const getActiveLinkClass = useCallback(
    ({ isActive }: { isActive: boolean }) =>
      cn('navbar-item', {
        'has-background-grey-lighter': isActive,
      }),
    [],
  );

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {pages.map(pageTitle => {
            const id = pageTitle.toLowerCase();

            return (
              <NavLink
                to={id === 'home' ? '/' : `/${id}`}
                className={getActiveLinkClass}
                key={id}
              >
                {pageTitle}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

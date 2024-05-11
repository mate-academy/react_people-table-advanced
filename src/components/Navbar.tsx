import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
  const { pathname, search } = useLocation();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
            href="/"
          >
            Home
          </a>

          <a
            className={classNames('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
            href={`#/people${pathname.slice(7)}${search}`}
          >
            People
          </a>
        </div>
      </div>
    </nav>
  );
};

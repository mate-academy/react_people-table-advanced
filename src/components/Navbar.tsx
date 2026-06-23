import { Link, useLocation, useMatch } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  const { search } = useLocation();
  const isHomeActive = !!useMatch('/');
  const isPeopleActive = !!useMatch('/people/*');

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isHomeActive,
            })}
          >
            Home
          </Link>

          <Link
            to={{ pathname: '/people', search }}
            className={classNames('navbar-item', {
              'has-background-grey-lighter': isPeopleActive,
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

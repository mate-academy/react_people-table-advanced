import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

export function Navbar() {
  const { pathname } = useLocation();

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
            className={cn('navbar-item', {
              'has-background-grey-lighter': pathname === '/',
            })}
          >
            Home
          </Link>

          <Link
            to="/people"
            className={cn('navbar-item', {
              'has-background-grey-lighter': pathname.startsWith('/people'),
            })}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
}

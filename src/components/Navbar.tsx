import { NavLink, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { slug } = useParams();

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
            className={({ isActive }) => classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to="/"
          >
            People
          </NavLink>
          <NavLink
            className={({ isActive }) => classNames('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to={{
              pathname: slug ? `/people/${slug}` : '/people',
              search: location.search,
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

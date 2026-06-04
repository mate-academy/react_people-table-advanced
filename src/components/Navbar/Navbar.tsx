import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClass} to="/" end>
            Home
          </NavLink>

          <NavLink
            className={getLinkClass}
            to={search ? `/people?${search}` : '/people'}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

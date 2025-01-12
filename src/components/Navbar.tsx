import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', { 'has-background-grey-lighter': isActive });
  const location = useLocation(); // Отримуємо поточний шлях
  const linkToPerson = `/people` + location.search + location.hash;

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to={linkToPerson} className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

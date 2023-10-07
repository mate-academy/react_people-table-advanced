import { NavLink } from 'react-router-dom';
import { getLinkClass } from '../utils/helpers';

export const Navigation: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) => getLinkClass(
    { isActive },
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
          <NavLink
            to="/"
            className={linkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/people"
            className={linkClass}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

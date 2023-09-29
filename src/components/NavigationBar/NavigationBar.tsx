import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Link } from '../../types/Link';

export const NavigationBar: React.FC = () => {
  const getClassNames = ({ isActive }: Link) => {
    return classNames(
      'navbar-item',
      {
        'has-background-grey-lighter': isActive,
      },
    );
  };

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
            className={getClassNames}
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={getClassNames}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

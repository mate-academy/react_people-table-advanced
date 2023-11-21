import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navigation = () => {
  const getClassNames = (isActive: boolean) => classNames(
    'navbar-item',
    { 'has-background-grey-lighter': isActive },
  );

  return (
    <div className="container">
      <div className="navbar-brand">
        <NavLink
          className={({ isActive }) => getClassNames(isActive)}
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => getClassNames(isActive)}
          to="/people"
        >
          People
        </NavLink>
      </div>
    </div>
  );
};

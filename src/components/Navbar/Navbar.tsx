import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { navButtons } from './navbarItems';

export const Navbar: React.FC = () => (
  <div className="navbar-brand">
    {navButtons.map(button => (
      <NavLink
        key={button.name}
        className={({ isActive }) => {
          return cn(
            'navbar-item',
            { 'has-background-grey-lighter': isActive },
          );
        }}
        to={button.path}
      >
        {button.name}
      </NavLink>
    ))}
  </div>
);

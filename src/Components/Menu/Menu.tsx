import { NavLink } from 'react-router-dom';
import './Menu.scss';

export const Menu = () => {
  return (
    <div className="menu">
      <NavLink
        to="/"
        className="link"
      >
        Home page
      </NavLink>
      <NavLink
        to="/people"
        className="link"
      >
        People page
      </NavLink>
    </div>
  );
};

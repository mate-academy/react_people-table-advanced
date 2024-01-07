import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { NavList } from '../../types/NavList';

type Props = {
  navList: NavList[],
};

export const Navbar: React.FC<Props> = ({ navList }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navList.map(({ href, title }) => (
            <NavLink
              to={href}
              key={href}
              className={({ isActive }) => cn('navbar-item', {
                'has-background-grey-lighter': isActive,
              })}
            >
              {title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

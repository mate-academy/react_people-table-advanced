import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

type Props = {
  navbarOptions: {
    to: string;
    title: string;
  }[]
};

export const Navbar: React.FC<Props> = ({ navbarOptions }) => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {navbarOptions.map(option => (
            <NavLink
              key={option.title}
              to={option.to}
              className={({ isActive }) => classNames(
                'navbar-item',
                { 'has-background-grey-lighter': isActive },
              )}
            >
              {option.title}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

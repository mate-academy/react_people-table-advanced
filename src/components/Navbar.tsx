import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
    return classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });
  };

  const NavigationLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    return (
      <NavLink className={navLinkStyle} to={to}>
        {children}
      </NavLink>
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
          <NavigationLink to="/">Home</NavigationLink>

          <NavigationLink aria-current="page" to="/people">
            People
          </NavigationLink>
        </div>
      </div>
    </nav>
  );
};

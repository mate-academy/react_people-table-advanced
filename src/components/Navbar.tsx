import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {
  interface Options {
    isActive: boolean;
  }

  const activeTab = ({ isActive }: Options) =>
    classNames('navbar-item', { ' has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={activeTab}>
            Home
          </NavLink>

          <NavLink aria-current="page" className={activeTab} to="people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

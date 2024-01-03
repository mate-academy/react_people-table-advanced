import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const handlerClassCondition = ({ isActive }: { isActive: boolean }) => (
  cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  })
);

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={handlerClassCondition} to="/">
            Home
          </NavLink>

          <NavLink className={handlerClassCondition} to="/people">
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

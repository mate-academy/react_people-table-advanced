import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
  to:string,
  text: string,
}

const PageNavLink: React.FC<Props> = ({ to, text }) => (
  <NavLink
    to={to}
    className={({ isActive }) => classNames(
      'navbar-item', { 'has-background-grey-lighter': isActive },
    )}
  >
    {text}
  </NavLink>
);

export const Navbar = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <PageNavLink to="/" text="Home" />
        <PageNavLink to="people" text="People" />
      </div>
    </div>
  </nav>
);

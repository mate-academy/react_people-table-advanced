import { homePath, peoplePath } from '../../consts/paths';
import { NavbarItem } from './NavbarItem';

export const Navbar: React.FC = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        <NavbarItem title="Home" to={homePath} />
        <NavbarItem title="People" to={peoplePath} />
      </div>
    </div>
  </nav>
);

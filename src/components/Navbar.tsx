import { Links } from '../types/Links';
import { NavigationLink } from './NavigationLink';

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
          <NavigationLink title={Links.home} />
          <NavigationLink title={Links.people} />
        </div>
      </div>
    </nav>
  );
};

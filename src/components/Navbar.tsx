import { PageNavLink } from './PageNavLink';
import { mainURL } from './globalVariables';

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
          <PageNavLink to={`${mainURL}/`} text="Home" />
          <PageNavLink to={`${mainURL}/people`} text="People" />
        </div>
      </div>
    </nav>
  );
};

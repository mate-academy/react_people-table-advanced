import { PageNavLink } from './PageNavLink';

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
          <PageNavLink to="/home" text="Home" />
          <PageNavLink to="/people" text="People" />

          {/* <NavLink
            className={classNames(
              'navbar-item',
              {
                'has-background-grey-lighter':
                location.pathname.includes('/home'),
              },
            )}
            to="/home"
          >
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={classNames(
              'navbar-item',
              {
                'has-background-grey-lighter':
                location.pathname.includes('/people'),
              },
            )}
            to="/people"
          >
            People
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
};

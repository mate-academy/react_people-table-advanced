import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`.trim();

  const peopleTo = {
    pathname: '/people',
    search: searchParams.toString() ? `?${searchParams.toString()}` : '',
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
          <NavLink to="/" className={activeClass} end>
            Home
          </NavLink>

          <NavLink to={peopleTo} className={activeClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

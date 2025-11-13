import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Перевіряємо чи активна сторінка People (включаючи /people/:slug)
  const isPeopleActive = location.pathname.startsWith('/people');

  // Зберігаємо поточні search параметри для People
  const searchString = searchParams.toString();
  const peopleLink = searchString ? `/people?${searchString}` : '/people';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to={peopleLink}
            className={`navbar-item ${isPeopleActive ? 'has-background-grey-lighter' : ''}`}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

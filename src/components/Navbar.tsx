import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation();

  // Перевіряємо, чи ми вже знаходимося десь всередині розділу /people
  const isPeopleSection = location.pathname.includes('/people');

  // Якщо ми вже в розділі People (наприклад, /people/some-slug),
  // беремо поточний шлях (який включає slug) і поточні фільтри.
  // Якщо ні (наприклад, ми на /home), ведемо просто на базовий /people.
  // const targetPath = isPeopleSection ? location.pathname : '/people';
  const targetSearch = isPeopleSection ? location.search : '';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link
            className={cn(
              'navbar-item',
              location.pathname === '/' ? 'has-background-grey-lighter' : '',
            )}
            to="/"
          >
            Home
          </Link>

          <Link
            aria-current="page"
            className={cn(
              'navbar-item',
              location.pathname.includes('/people')
                ? 'has-background-grey-lighter'
                : '',
            )}
            to={`/people${targetSearch}`}
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

type MenuItem = {
  menuName: string;
  path: string;
};

const menuItems: MenuItem[] = [
  {
    menuName: 'Home',
    path: '/',
  },
  {
    menuName: 'People',
    path: '/people',
  },
];

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {menuItems.map(item => (
            <NavLink
              key={item.menuName}
              to={{
                pathname: item.path,
                search:
                  item.path === '/people' ? searchParams.toString() : undefined,
              }}
              end={item.path === '/'}
              className={({ isActive }) => {
                return classNames('navbar-item', {
                  'has-background-grey-lighter': isActive,
                });
              }}
            >
              {item.menuName}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

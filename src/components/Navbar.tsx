import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

enum EnumLinks {
  Home,
  People,
}
const Links = Object.values(EnumLinks).filter(link => typeof link === 'string');

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return classNames('navbar-item', { 'has-background-grey-lighter': isActive });
};

export const Navbar = () => {
  const [params] = useSearchParams();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          {Links.map(link => {
            const pagePath = link.toLowerCase();
            const urlParams = params.toString().length ? `?${params}` : '';
            const pathWithParams = `/${pagePath}${urlParams}`;

            return (
              <NavLink
                key={link}
                aria-current="page"
                to={pathWithParams}
                className={getLinkClassName}
              >
                {link}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

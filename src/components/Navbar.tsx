import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const [searchParams] = useSearchParams();
  const generateClassForLink = ({ isActive }: {
    isActive: boolean
  }) => cn('navbar-item', {
    'has-background-grey-lighter': isActive,
  });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={generateClassForLink} to="/">
            Home
          </NavLink>
          <NavLink
            className={generateClassForLink}
            to={{
              pathname: 'people',
              search: searchParams.toString(),
            }}
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

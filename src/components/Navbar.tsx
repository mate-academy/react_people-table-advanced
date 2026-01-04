import classNames from 'classnames';
import { NavLink, useSearchParams } from 'react-router-dom';

export const Navbar = () => {
  const [searchParams] = useSearchParams();

  const getLinksClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'has-background-grey-lighter': isActive,
    });

  const peopleLink = searchParams.toString()
    ? `/people?${searchParams.toString()}`
    : '/people';

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinksClass}>
            Home
          </NavLink>

          <NavLink to={peopleLink} className={getLinksClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

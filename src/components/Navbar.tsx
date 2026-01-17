import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const Navbar = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('navbar-item', {
      'is-active': isActive,
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
          <SearchLink to="/" end className={getLinkClass}>
            Home
          </SearchLink>

          <SearchLink to="/people" className={getLinkClass}>
            People
          </SearchLink>
        </div>
      </div>
    </nav>
  );
};

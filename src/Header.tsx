import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';

type Status = { isActive: boolean };

const getActiveClass = (status: Status) => classNames(
  'nav-bar-item',
  'Nav__link',
  'Nav',
  { 'has-background-grey-lighter': status.isActive },
);

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="Header">
      <nav className="Nav">
        <NavLink to="/" className={getActiveClass}>Home</NavLink>
        <NavLink
          to={{
            pathname: '/people',
            search: location.search,
          }}
          className={getActiveClass}
        >
          People
        </NavLink>
      </nav>
    </header>
  );
};

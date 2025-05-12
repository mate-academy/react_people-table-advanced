import { useLocation } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

const ACTIVE_NAV_CLASS = 'has-background-grey-lighter';

export const Navbar: React.FC = () => {
  const { hash } = useLocation();

  const isActive = (path: string) => {
    const current = hash.replace(/^#/, '').split('?')[0];

    return current === path;
  };

  return (
    <nav className="tabs is-boxed mb-4" data-cy="nav">
      <ul>
        <li>
          <SearchLink
            to="/"
            params={{}}
            className={classNames({ [ACTIVE_NAV_CLASS]: isActive('/') })}
          >
            Home
          </SearchLink>
        </li>

        <li>
          <SearchLink
            to="/people"
            params={{}}
            className={classNames({ [ACTIVE_NAV_CLASS]: isActive('/people') })}
          >
            People
          </SearchLink>
        </li>
      </ul>
    </nav>
  );
};

import { NavLink, useSearchParams } from 'react-router-dom';
import { getLinkClass } from '../utils/functions';

export const Navbar = () => {
  const [params] = useSearchParams();
  const restOfParams = params.toString();

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to={`/people?${restOfParams}`} className={getLinkClass}>
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

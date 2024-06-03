import { NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn('navbar-item', { 'has-background-grey-lighter': isActive });

const Navigation = () => {
  const [searchParams] = useSearchParams();

  return (
    <div className="container">
      <div className="navbar-brand">
        <NavLink className={getLinkClass} to="/">
          Home
        </NavLink>

        <NavLink className={getLinkClass} to={{pathname: 'people', search: searchParams.toString()}}>
          People
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;

import { Outlet, Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__links navbar is-success">
        <Link to="/">
          <h1 className="title is-4 is-spaced is-hoverable">Home</h1>
        </Link>
        <Link to="/people">
          <h1 className="title is-4 is-spaced is-hoverable">People</h1>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

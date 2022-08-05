/* eslint-disable react/jsx-filename-extension */
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar is-primary">
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <div className="navbar-item">
          <Link to="/home">
            <button type="button" className="button is-link">
              Home
            </button>
          </Link>
        </div>

        <div className="navbar-item">
          <Link to="/people">
            <button type="button" className="button is-link">
              People
            </button>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;

import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <Link to="/home">
        Home
      </Link>
      <Link to="/people">
        People
      </Link>
    </div>
  );
};

export default Header;

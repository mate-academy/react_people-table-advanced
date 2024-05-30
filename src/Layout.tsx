import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

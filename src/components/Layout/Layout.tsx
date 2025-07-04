import NavLinks from '../NavLinks/NavLinks';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div data-cy="app">
      <NavLinks />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

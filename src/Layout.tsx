import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './Layout.scss';

export const Layout = () => {
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

import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const HomeLayout = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);

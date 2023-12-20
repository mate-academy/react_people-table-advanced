import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Header = () => (
  <div>
    <Navbar />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

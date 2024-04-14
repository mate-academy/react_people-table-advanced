import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar/Navbar';

export const Layout: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

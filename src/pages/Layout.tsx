import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/navigation/Navigation';

export const Layout = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

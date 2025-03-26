import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';

export const MainLayout = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

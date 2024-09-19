import { Outlet } from 'react-router-dom';
import { MainNavigation } from '../components/MainNavigation';

export const MainLayout = () => (
  <main className="section">
    <div className="container">
      <MainNavigation />

      <Outlet />
    </div>
  </main>
);

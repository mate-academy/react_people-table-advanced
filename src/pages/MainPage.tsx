import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const MainPage = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

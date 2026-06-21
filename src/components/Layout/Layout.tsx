import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';

export function Layout() {
  return (
    <>
      <Navigation />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

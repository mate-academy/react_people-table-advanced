import { Outlet } from 'react-router-dom';
import { PageNavigation } from '../Shared/PageNavigation';

export const Layout = () => {
  return (
    <>
      <PageNavigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

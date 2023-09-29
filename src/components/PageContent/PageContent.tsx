import { Outlet } from 'react-router-dom';
import { PageNavigation } from '../PageNavigation';

export const PageContent = () => {
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

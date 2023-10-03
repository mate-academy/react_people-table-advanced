import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

export const PageContent = () => {
  return (
    <>
      <NavBar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

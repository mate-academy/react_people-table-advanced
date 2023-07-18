import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';

export const MainLayout: FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

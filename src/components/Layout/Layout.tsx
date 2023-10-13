import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';

export const Layout: FC = () => {
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

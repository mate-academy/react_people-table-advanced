import { FC } from 'react';
import { Nav } from './Nav';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
  return (
    <div data-cy="app">
      <Nav />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

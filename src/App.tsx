import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigation';

export const App: FC = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

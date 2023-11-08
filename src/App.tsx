import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

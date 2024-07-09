import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <Navbar />
    </nav>

    <main className="section">
      <Outlet />
    </main>
  </div>
);

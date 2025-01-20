import { Outlet } from 'react-router-dom';

import './App.scss';

import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <main className="section">
      <Navbar />

      <div className="container">
        <div className="block">
          <Outlet />
        </div>
      </div>
    </main>
  </div>
);

import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';

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

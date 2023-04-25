import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navigation/Navbar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);

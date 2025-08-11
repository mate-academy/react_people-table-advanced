import { Outlet } from 'react-router-dom';
import { NavBar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <div className="section">
        <Outlet />
      </div>
    </div>
  );
};

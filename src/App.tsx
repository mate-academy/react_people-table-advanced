import { Outlet } from 'react-router-dom';

import './App.scss';
import { Navigation } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <Outlet />
    </div>
  );
};

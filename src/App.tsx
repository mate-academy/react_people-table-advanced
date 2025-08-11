import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

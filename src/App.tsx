import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

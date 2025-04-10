import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar.tsx';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <div className="section">
      <Outlet />
    </div>
  </div>
);

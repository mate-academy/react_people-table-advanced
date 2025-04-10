import { Outlet } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <div className="section">
      <Outlet />
    </div>
  </div>
);

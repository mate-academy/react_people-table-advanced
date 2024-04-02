import { Outlet } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar/Navbar';

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

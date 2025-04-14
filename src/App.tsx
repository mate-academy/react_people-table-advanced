import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <Outlet />
    </main>
  </div>
);

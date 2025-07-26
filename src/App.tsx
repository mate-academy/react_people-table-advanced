import './App.scss';
import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

import { Outlet } from 'react-router-dom';
import { Navbar } from './components/NavBar';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

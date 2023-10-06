import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

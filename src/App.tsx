import { Outlet } from 'react-router-dom';
import './App.scss';
import NavBars from './components/NavBars.tsx/NavBars';

export const App = () => (
  <div data-cy="app">
    <NavBars />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

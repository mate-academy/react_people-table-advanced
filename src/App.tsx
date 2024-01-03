import { Outlet } from 'react-router-dom';
import './App.scss';
import { Nav } from './components/Nav';

export const App = () => (
  <div data-cy="app">
    <Nav />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

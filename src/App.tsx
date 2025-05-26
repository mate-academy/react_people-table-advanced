import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />
    <main className="main-content">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

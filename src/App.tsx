import { Outlet } from 'react-router-dom';
import './App.scss';
import { AppNavigation } from './components/AppNavigation';

export const App = () => (
  <div data-cy="app">
    <AppNavigation />
    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

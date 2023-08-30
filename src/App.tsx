import { Outlet } from 'react-router-dom';
import { AppNavigation } from './components/AppNavigation';
import './App.scss';

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

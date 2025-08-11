import './App.scss';
import { NavigationLink } from './components/NavigationLink';
import { Outlet } from 'react-router-dom';

export const App = () => (
  <div data-cy="app">
    <NavigationLink />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

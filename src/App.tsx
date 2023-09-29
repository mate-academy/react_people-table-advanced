import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';

export const App = () => (
  <div data-cy="app">
    <NavigationBar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

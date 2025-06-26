import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navigation } from './components/Navigarion';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Outlet />
      </div>
    </main>
  </div>
);

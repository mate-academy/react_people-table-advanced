import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

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

import { Outlet } from 'react-router-dom';
import { NavBar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

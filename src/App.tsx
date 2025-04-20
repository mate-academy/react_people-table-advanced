import './App.scss';
import { Outlet } from 'react-router-dom';
import { NavBar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

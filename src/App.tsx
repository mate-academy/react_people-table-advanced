import { Outlet } from 'react-router-dom';
import './App.scss';
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

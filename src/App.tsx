import { Navbar } from './components/Navbar';
import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <div className="section">
        <div className="container">
          <Navbar />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

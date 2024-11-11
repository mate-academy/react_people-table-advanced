import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section" style={{ marginTop: '48px' }}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

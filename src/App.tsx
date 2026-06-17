import { Navbar } from './components/Navbar';
import { Outlet } from 'react-router-dom';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container" style={{ marginTop: '60px' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

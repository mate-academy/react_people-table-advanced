import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';
import { MainContext } from './utils/context/MainContext';

export const App = () => {
  return (
    <MainContext>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </MainContext>
  );
};

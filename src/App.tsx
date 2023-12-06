import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';
import { GlobalProvider } from './components/GeneralContext';

export const App = () => {
  return (
    <GlobalProvider>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
};

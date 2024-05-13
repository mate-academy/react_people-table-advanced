import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';
import { PeopleProvider } from './context/PeopleProvider';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <PeopleProvider>
            <Outlet />
          </PeopleProvider>
        </div>
      </div>
    </div>
  );
};

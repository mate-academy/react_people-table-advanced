import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';
import { PeopleContextProvider } from './components/Context';

export const App = () => {
  return (
    <PeopleContextProvider>
      <div data-cy="app">
        <Navbar />

        <main className="section">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </PeopleContextProvider>
  );
};

import './App.scss';
import { Outlet } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Navbar } from './components/Navbar';
import { useContext } from 'react';
import { PeopleContext } from './Context';

export const App = () => {
  const { pathname } = useContext(PeopleContext);

  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          {pathname === '/' && <HomePage />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <html className="has-navbar-fixed-top"></html>
      <Navbar />
      <main className="section">
        <div className="container">
          <div className="block">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

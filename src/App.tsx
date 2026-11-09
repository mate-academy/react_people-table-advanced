import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <html className="has-navbar-fixed-top">
      <main data-cy="app">
        <Navbar />

        <div className="section"> {<Outlet />} </div>
      </main>
    </html>
  );
};

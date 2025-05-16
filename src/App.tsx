import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === '/') {
      return 'Home Page';
    }

    if (location.pathname.startsWith('/people')) {
      return 'People Page';
    }

    return 'Page not found';
  };

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <h1 className="title">{getTitle()}</h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

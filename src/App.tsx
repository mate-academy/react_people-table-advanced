import './App.scss';
import { Outlet } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';

export const App = () => {
  return (
    <div data-cy="app">
      <Nav />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

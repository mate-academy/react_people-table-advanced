import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <div className="section">
        <div className="container">
          <h1 className="title">Home Page</h1>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

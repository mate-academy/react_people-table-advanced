import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <Outlet />
    </div>
  );
};

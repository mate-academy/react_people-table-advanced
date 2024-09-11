import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import './App.scss';

export const App = () => (
  <>
    <Navigation />
    <Outlet />
  </>
);

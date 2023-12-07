import './App.scss';
import { Outlet } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Outlet />
    </div>
  );
};

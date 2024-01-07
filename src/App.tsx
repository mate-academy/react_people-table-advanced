import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';

const navList = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/people',
    title: 'People',
  },
];

export const App = () => (
  <div className="App" data-cy="app">
    <Navbar navList={navList} />
    <Outlet />
  </div>
);

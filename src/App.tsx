//import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';
//import classNames from 'classnames';
//const getLinkClass = ({ isActive }: { isActive: boolean }) =>
//classNames('navbar-item', { 'has-background-grey-lighter': isActive });

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <Outlet />
    </main>
  </div>
);

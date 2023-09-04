import { Outlet } from 'react-router-dom';

import { Navigation } from './components/Navigation';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <div className="section">
      <div className="container">
        <Outlet />
      </div>
    </div>
  </div>
);

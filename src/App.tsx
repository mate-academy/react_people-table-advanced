import { Navbar } from './components/Navbar';
import { Router } from './router/Router';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Router />
        </div>
      </div>

    </div>
  );
};

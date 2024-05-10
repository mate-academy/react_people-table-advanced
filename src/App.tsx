import { Navbar } from './components/Navbar';

import './App.scss';
import { AppRoutes } from './components/AppRoutes';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
};

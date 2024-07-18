import { Navbar } from './components/Navbar';
import { AppRoutes } from './AppRoutes';

import './App.scss';

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

import { Navbar } from './components/Navbar';

import './App.scss';
import { AppRoutes } from './components/AppRoutes';
import { PeopleContext } from './PeopleContext';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <PeopleContext>
            <AppRoutes />
          </PeopleContext>
        </div>
      </div>
    </div>
  );
};

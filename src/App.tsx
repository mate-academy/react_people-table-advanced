import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <h1 className="title">Home Page</h1>
          <h1 className="title">Page not found</h1>
          <PeoplePage />
        </div>
      </div>
    </div>
  );
};

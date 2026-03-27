import './App.scss';
import { NavBar } from './components/NavBar';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <NavBar />
        <Outlet />
      </div>
    </>
  );
};

/*import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/NavBar/NavBar';

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
};*/

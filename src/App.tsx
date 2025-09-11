import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          {/* {isPeopleLocation && <h1 className="title">People Page</h1>} */}

          <div className="block">
            <div className="box table-container">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

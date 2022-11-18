import { Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/people">
              <Route
                index
                element={<PeoplePage />}
              />
              <Route
                path=":user"
                element={<PeoplePage />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

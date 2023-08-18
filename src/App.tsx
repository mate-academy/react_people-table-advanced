import { Routes, Route } from 'react-router-dom';
import { PeoplePage } from './components/peoplePage/PeoplePage';
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
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":selectedSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

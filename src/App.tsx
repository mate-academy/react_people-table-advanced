import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/people">
              <Route
                path=":selectedPersonSlug?"
                element={<PeoplePage />}
              />
            </Route>
            <Route path="/home" element={<Navigate to="/" replace />} />
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

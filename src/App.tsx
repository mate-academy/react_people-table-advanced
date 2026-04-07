import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:personSlug" element={<PeoplePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

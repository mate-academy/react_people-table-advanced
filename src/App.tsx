import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" />} />
            <Route
              path="/"
              element={
                <h1 className="title">Home Page</h1>
              }
            />
            <Route
              path="*"
              element={
                <h1 className="title">Page not found</h1>
              }
            />
            <Route path="/people/:slug?" element={<PeoplePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

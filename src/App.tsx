import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
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
            <Route path="/">
              <Route index element={<h1 className="title">Home Page</h1>} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="people" element={<PeoplePage />}>
                <Route index />
                <Route path=":selectedPersone" />
              </Route>
              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

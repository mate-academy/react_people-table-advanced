import { Navigate, Route, Routes } from 'react-router-dom';
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
            <Route path="/" element={<h1 className="title">Home page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="people"
              element={(<PeoplePage />)}
            >
              <Route index element={(<PeoplePage />)} />
              <Route path=":slug" element={(<PeoplePage />)} />
            </Route>

            <Route path="*" element={<p>Page not found</p>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

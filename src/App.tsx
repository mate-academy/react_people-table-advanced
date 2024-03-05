import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route path=":slug?" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';
import { Route, Navigate } from 'react-router-dom';

import './App.scss';
import { Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<Navigate to="/" replace />}></Route>
            <Route path="/people" element={<PeoplePage />} />
            <Route path="people/:slug" element={<PeoplePage />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

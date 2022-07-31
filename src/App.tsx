import React from 'react';

import { Routes, Route, Navigate } from 'react-router';

import './App.scss';

import Header from './components/Header';
import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

const App: React.FC = () => (
  <div className="App">
    <div className="container">
      <div className="mt-3">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default App;

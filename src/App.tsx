import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';

import Header from './components/Header/Header';

import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":personSlug" element={<PeoplePage />} />
        <Route path="new" element={<PeoplePage />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" />} />

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  </div>
);

export default App;

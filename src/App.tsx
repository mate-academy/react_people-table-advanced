import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

import 'bulma';
import './App.scss';
import { Navigation } from './components/Navigation';

const App: React.FC = () => (
  <div className="App">
    <Navigation />

    <div className="columns">
      <div className="column">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":personSlug" />
          </Route>
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default App;

import React from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';

import { Paths } from './types/Paths';

import './App.scss';

import PeoplePage from './components/PeoplePage';
import NotFoundPage from './components/NotFoundPage';

const App: React.FC = () => (
  <div className="App">
    <header>
      <nav className="navbar">
        <Link to={`/${Paths.Home}`} className="navbar-item">Home</Link>
        <Link to={`/${Paths.People}`} className="navbar-item">People</Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<h1 className="title">Home page</h1>} />
      <Route path={Paths.Home} element={<Navigate to="/" replace />} />
      <Route path={`${Paths.People}/:personSelected`} element={<PeoplePage />} />
      <Route path={Paths.People} element={<PeoplePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;

import React from 'react';
import {
  Routes, Route, Link, Navigate,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PeoplePage from './components/PeoplePage';

import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <header>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/people" className="nav-link">People</Link>
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />

      {/* <Route path="/people/*" element={<Navigate to="/people" />} /> */}
      <Route path="/home" element={<Navigate to="/" replace />} />
      {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}
    </Routes>
  </div>
);

export default App;

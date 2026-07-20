import { PeoplePage } from './components/PeoplePage';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </div>
  </div>
);

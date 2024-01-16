import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { People } from './components/peopleTable';
import { PageNotFound } from './components/pageNotFound';
import { HomePage } from './components/homePage';

import './App.scss';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Navbar />
        </div>
      </div>
    </nav>

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<People />} />
            <Route path=":slug?" element={<People />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>

      </div>
    </main>
  </div>
);

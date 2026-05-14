import { Navbar } from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { HashRouter } from 'react-router-dom';

import './App.scss';

export const App = () => (
  <HashRouter>
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<Navigate to="/" replace />}></Route>
            <Route path="people" element={<PeoplePage />} />
            <Route path="people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  </HashRouter>
);

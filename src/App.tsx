import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/pages/PeoplePage';

import './App.scss';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { ErrorPage } from './components/pages/ErrorPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">

        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route index />
            <Route path=":slug" />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);

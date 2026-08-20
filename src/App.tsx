import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import { HomePage } from './HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './NotFoundPage';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route index element={<PeoplePage />}></Route>
            <Route path=":slug" element={<PeoplePage />}></Route>
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

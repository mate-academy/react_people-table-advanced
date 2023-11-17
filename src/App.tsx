import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

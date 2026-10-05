import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { NotFound } from './components/NotFoundPage';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';
import { Navbar } from './components/Navbar';

export const App = () => {
  return (
    <div data-cy="app">

      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

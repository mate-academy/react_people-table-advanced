import { Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Routes } from 'react-router-dom';
import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

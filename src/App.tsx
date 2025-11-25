import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';

import { NotFoundPage } from './components/pages/NotFoundPage';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to={'/'} replace />} />

      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

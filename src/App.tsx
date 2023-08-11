import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { NavBar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/Pages/HomePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to={'/'} replace />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/people" element={<PeoplePage />}></Route>
            <Route path="/people/:slug" element={<PeoplePage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

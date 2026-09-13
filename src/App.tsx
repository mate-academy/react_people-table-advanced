import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';
import Home from './Home';

import './App.scss';

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <Navbar />
      </div>
      <div className="section">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

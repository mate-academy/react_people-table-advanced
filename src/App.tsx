import { FC } from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: FC = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

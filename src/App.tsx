import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage/HomePage';

import './App.scss';
// eslint-disable-next-line import/order
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

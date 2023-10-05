import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

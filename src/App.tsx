import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app" className="app">
      <div className="nav">
        <Navbar />
      </div>

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":person" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

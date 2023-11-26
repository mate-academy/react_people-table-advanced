import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';

import { Navbar } from './components/Navbar';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

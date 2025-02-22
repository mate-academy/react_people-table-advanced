import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { Navigation } from './components/Navigation';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />
      <main className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

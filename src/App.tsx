import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path={`/people`}>
              <Route index element={<PeoplePage />} />
              <Route path=":personID/*" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

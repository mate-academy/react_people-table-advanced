import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { NotFound } from './components/NotFound';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

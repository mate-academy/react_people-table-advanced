import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="people/:personName?" element={<PeoplePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

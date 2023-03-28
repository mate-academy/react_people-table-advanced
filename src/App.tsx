import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
            <Route path="home" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

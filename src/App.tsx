import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<Navigate to="/" replace />}></Route>
            <Route path="/people">
              <Route index element={<PeoplePage />}></Route>
              <Route path=":slug" element={<PeoplePage />}></Route>
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

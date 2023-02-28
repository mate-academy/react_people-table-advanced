import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  </div>
);

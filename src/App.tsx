import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { MainPage } from './pages/MainPage';

export const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to={'/'} replace />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

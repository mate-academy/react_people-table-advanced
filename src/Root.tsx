import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<HomePage />}></Route>
    <Route path="/home" element={<Navigate to="/" replace />}></Route>
    <Route path="/people" element={<PeoplePage />}></Route>
    <Route path="/people/:slug" element={<PeoplePage />}></Route>
    <Route path="*" element={<NotFoundPage />}></Route>
  </Routes>
);

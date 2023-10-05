import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const MainRouter:React.FC = () => (
  <main className="section">
    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/people/:slug" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>
);

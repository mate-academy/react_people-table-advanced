import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage/HomePage';
import { PeoplePage } from '../pages/PeoplePage/PeoplePage';

export const Router: React.FC = () => (
  <Routes>
    <Route path="*" element={<h1 className="title">Page not found</h1>} />
    <Route path="/" element={<HomePage />} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="people">
      <Route index element={<PeoplePage />} />
      <Route path=":slug" element={<PeoplePage />} />
    </Route>
  </Routes>
);

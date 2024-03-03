import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, NotFoundPage, PeoplePage } from '../pages';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="/people">
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

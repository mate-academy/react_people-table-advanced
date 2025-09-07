import { Navigate, Route, Routes } from 'react-router-dom';
import { PeopleHomePage } from '../PeopleHomePage';
import { NotFoundPage } from '../NotFoundPage';
import { PeoplePage } from '../PeopleTable/PeoplePage';

export const PeopleRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PeopleHomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/people/:slug" element={<PeoplePage />} />

      <Route path="/home" element={<Navigate to="/" replace />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

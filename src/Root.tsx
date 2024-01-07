import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage/Home-page';
import { PeoplePage } from './components/PeopleTable/PeopleTable';
import { Layout } from './components/LayOut/LayOut';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

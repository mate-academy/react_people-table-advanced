import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from '../PeoplePage';
import { PageError } from '../PageError';

export const Pages = () => (
  <Routes>
    <Route path="/" element={<h1 className="title">Home Page</h1>} />
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="*" element={<PageError />} />
    <Route path="people">
      <Route index element={<PeoplePage />} />
      <Route path=":slug" element={<PeoplePage />} />
    </Route>
  </Routes>
);

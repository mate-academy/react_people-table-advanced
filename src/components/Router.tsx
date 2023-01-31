import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './PeoplePage';

export const Router: React.FC = () => (
  <Routes>
    <Route
      path="/"
      element={<h1 className="title">Home Page</h1>}
    />

    <Route
      path="home"
      element={<Navigate to="/" replace />}
    />

    <Route path="people">
      <Route index element={<PeoplePage />} />
      <Route path=":slug" element={<PeoplePage />} />
    </Route>

    <Route
      path="*"
      element={<h1 className="title">Page not found</h1>}
    />
  </Routes>
);

import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { PeoplePage } from '../pages/PeoplePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
      </Route>

      <Route
        path="*"
        element={<h1 className="title">Page not found</h1>}
      />
    </Routes>
  );
};

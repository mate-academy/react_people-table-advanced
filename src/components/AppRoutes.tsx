import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './PeoplePage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1 className="title">Home Page</h1>} />
      <Route path="/home" element={<Navigate to="/" replace={true} />} />
      <Route path="/people" element={<PeoplePage />}>
        <Route path="/people/:personSlug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<h1 className="title">Page not found</h1>} />
    </Routes>
  );
};

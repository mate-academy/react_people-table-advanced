import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Routes>
    <Route path="/home" element={<Navigate to="/" replace />} />
    <Route path="/" element={<h1 className="title">Home Page</h1>} />
    <Route path="/people" element={<PeoplePage />} />
    <Route path="/people/:personSlug" element={<PeoplePage />} />
    <Route path="*" element={<h1 className="title">Page not found</h1>} />
  </Routes>
);

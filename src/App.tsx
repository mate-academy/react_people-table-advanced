import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<h1 className="title">Home Page</h1>} />
        <Route path="/people" element={<PeoplePage />}>
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  );
};

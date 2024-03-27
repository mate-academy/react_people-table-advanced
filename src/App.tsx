import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/people">
          <Route index element={<PeoplePage />} />
          <Route path=":personSlug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

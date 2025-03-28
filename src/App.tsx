import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NotFoundPage } from './pages/PageNotFound/NotFoundPage';
import { MainLayout } from './layout/MainLayout';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="people/:slug" element={<PeoplePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

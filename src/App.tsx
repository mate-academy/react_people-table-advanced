import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';
import { PeoplePage } from './Pages/PeoplePage';
import { HomeLayout } from './Pages/HomeLayout';
import './App.scss';

export const App = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

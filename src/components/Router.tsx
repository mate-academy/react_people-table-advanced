import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleContextProvider } from '../contexts/PeopleContext';

const PeopleLayout = () => (
  <PeopleContextProvider>
    <Outlet />
  </PeopleContextProvider>
);

export const Router = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="people" element={<PeopleLayout />}>
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

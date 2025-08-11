import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { PeoplePage } from '../../pages/PeoplePage';
import { App } from '../../App';
import { PeopleContextProvider } from '../../context/PeopleContext';

const PeopleLayout = () => (
  <PeopleContextProvider>
    <Outlet />
  </PeopleContextProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />

      <Route path="people" element={<PeopleLayout />}>
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

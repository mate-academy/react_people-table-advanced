import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from '../components/PeoplePage';
import { HomePage } from '../components/HomePage';
import { App } from '../App';
import { Routes as AppRoutes } from '../types/Routes';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<App />}>
        <Route index element={<HomePage />} />
        <Route
          path="home"
          element={<Navigate to={AppRoutes.Home} replace={true} />}
        />
        <Route path={AppRoutes.People}>
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route
          path={AppRoutes.NotFound}
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>
    </Routes>
  );
};

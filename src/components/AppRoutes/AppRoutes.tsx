import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../HomePage';
import { PeoplePage } from '../PeoplePage';
import { PageNotFound } from '../PageNotFound';
import { App } from '../../App';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

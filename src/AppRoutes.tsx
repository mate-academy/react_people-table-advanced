import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { PeoplePage } from './Pages/PeoplePage';
import { PageNotFound } from './Pages/PageNotFound';
import { Layout } from './components/Layout';

export const AppRoutes = () => (
  <div>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </div>
);

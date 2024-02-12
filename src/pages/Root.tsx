import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { PageNotFound } from './PageNotFound';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route
        path="home"
        element={<Navigate to=".." replace />}
      />
      <Route path="people">
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
);

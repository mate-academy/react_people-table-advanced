import {
  Navigate, Route, Routes,
} from 'react-router-dom';

import { App } from '../App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';
import { PageError } from './PageError';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="People" element={<PeoplePage />}>
        <Route path=":personId" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageError />} />
    </Route>
  </Routes>
);

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { PeoplePage } from './components/pages/PeoplePage';
import { NotFoundPage } from './components/pages/NotFoundPage';

import { App } from './App';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Navigate to="/" replace={true} />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/people/:slug?" element={<PeoplePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { PeoplePage } from './PeoplePage';
import { HomePage } from './HomePage';
import { NotFoundPage } from './NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

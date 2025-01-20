import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route index element={<HomePage />} />
      <Route path="/people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

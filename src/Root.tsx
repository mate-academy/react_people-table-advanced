import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

export const Root: React.FC = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="*" element={<NotFoundPage />} />
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to={'../'} replace />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>
    </Route>
  </Routes>
);

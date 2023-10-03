import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  Layout,
  HomePage,
  PeoplePage,
  NotFoundPage,
} from './components';

import './App.scss';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path="people">
        <Route path=":slug?" element={<PeoplePage />} />
      </Route>

      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

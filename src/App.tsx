import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/Pages/Home';
import { NotFoundPage } from './components/Pages/NotFound';
import { PeoplePage } from './components/Pages/People';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personId" />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

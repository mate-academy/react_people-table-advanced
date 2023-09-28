import './App.scss';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PageContent } from './components/PageContent/PageContent';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<PageContent />}>
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

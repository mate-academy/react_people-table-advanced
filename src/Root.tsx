import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';

export const Root = () => {
  return (
    <HashRouter>
      <PeopleProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="*" element={<NotFoundPage />} />
            <Route index element={<HomePage />} />
            <Route path="people" element={<PeoplePage />}>
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="home" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </PeopleProvider>
    </HashRouter>
  );
};

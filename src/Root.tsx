import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { App } from './App';
import { PeoplePage } from './Pages/PeoplePage';
import { NotFoundPage } from './Pages/NotFoundPage';
import { PeopleProvider } from './store/PeopleContex';

export const Root = () => (
  <PeopleProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people/:slug?" element={<PeoplePage />}>
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  </PeopleProvider>
);

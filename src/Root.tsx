import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { PeopleProvider } from './store/PeopleContext';
import { HomePage } from './pages/HomePage';
import { Page404 } from './pages/Page404';

export const Root = () => {
  return (
    <PeopleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slugParam" element={<PeoplePage />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </Router>
    </PeopleProvider>
  );
};

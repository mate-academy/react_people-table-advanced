import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { GlobalProvider } from './GlobalProvider';

export const Root = () => (
  <Router>
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":personName" element={<PeoplePage />} />
          </Route>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </GlobalProvider>
  </Router>
);

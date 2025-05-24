import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PeopleProvider } from './store/PeopleContext';
import { LoadingProvider } from './store/LoadingContext';
import { ErrorProvider } from './store/ErrorContext';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';

export const Root = () => (
  <Router>
    <PeopleProvider>
      <LoadingProvider>
        <ErrorProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>

              <Route
                path="*"
                element={<h1 className="title">Page not found</h1>}
              />
            </Route>
          </Routes>
        </ErrorProvider>
      </LoadingProvider>
    </PeopleProvider>
  </Router>
);

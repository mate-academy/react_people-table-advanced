import { Navigate, HashRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { PeopleProvider } from './context/PeopleContext';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route
            path=":personSlug?"
            element={
              <PeopleProvider>
                <PeoplePage />
              </PeopleProvider>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

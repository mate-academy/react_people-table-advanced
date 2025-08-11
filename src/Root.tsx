import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage, NotFoundPage, PeoplePage } from './pages';
import { PeopleContextProvider } from './context/PeopleContext';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route index element={<HomePage />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="people">
          <Route
            path=":activePerson?"
            element={
              <PeopleContextProvider>
                <PeoplePage />
              </PeopleContextProvider>
            }
          />
        </Route>
      </Route>
    </Routes>
  </Router>
);

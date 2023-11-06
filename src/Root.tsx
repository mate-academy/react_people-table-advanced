import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { App } from './App';
import { UsersProvider } from './store/peopleContext';
import { HomePage } from './components/Pages/HomePage';
import { PeoplePage } from './components/Pages/PeoplePage';
import { ErrorPage } from './components/Pages/ErrorPage';

export const Root = () => (
  <Router>
    <UsersProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route
            path="people"
            element={<PeoplePage />}
          >
            <Route path=":slugId" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </UsersProvider>
  </Router>
);

import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';
import { PeopleProvider } from './context/PeopleContext';

export const Root = () => {
  return (
    <PeopleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people/:personName?" element={<PeoplePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </PeopleProvider>
  );
};

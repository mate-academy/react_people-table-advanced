import {
  Route,
  HashRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect from '/home' to '/' */}
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route index element={<Home />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:personName" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

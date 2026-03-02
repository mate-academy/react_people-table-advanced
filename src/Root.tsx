import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './components/Home/Home';
import { PeoplePage } from './components/PeoplePage';
// eslint-disable-next-line max-len
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<ErrorNotification />} />
      </Route>
    </Routes>
  </Router>
);

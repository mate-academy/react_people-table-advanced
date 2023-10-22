import {
  Navigate,
  Route,
  Routes,
  HashRouter as Router,
} from 'react-router-dom';
import { App } from './App';
import './App.scss';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="home" element={<Navigate replace to="/" />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":personSlug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);

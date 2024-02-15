import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
    <App />
  </Router>
);

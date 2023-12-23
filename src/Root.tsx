import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":urlSlug" element={<PeoplePage />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Route>
    </Routes>
  </Router>
);

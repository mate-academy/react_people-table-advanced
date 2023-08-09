import {
  Navigate, Route, HashRouter as Router, Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeopleTable } from './components/PeopleTable';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="people">
          <Route index element={<PeopleTable />} />
          <Route path=":personSlug" element={<PeopleTable />} />
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);

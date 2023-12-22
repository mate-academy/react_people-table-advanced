import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<h1 className="title">Home Page</h1>} />
        <Route path="/home" element={<Navigate to=".." />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
        <Route path="/people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
      </Route>
    </Routes>
  </Router>
);

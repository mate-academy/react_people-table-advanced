import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { HomePage } from './components/HomePage/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people/:slug?" element={<PeoplePage />} />
        <Route path="home" element={<Navigate to="/" />} />

        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        ></Route>
      </Route>
    </Routes>
  </Router>
);

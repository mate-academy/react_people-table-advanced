import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';

import { Home } from './pages/Home';
import { People } from './pages/People';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />

        <Route index element={<Home />} />
        <Route path="people" element={<People />} />
        <Route path="people/:slug" element={<People />} />
      </Route>
    </Routes>
  </Router>
);

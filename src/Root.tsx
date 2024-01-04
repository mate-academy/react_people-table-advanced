import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home';
import { People } from './pages/People';
import { NotFound } from './pages/NotFound';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="people">
            <Route path=":slug?" element={<People />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

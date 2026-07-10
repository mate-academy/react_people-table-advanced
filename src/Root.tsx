import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFound } from './components/NotFound';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

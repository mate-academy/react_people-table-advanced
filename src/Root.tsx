import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { GlobalStateProvider } from './Store';

export const Root = () => (
  <GlobalStateProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="people">
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </GlobalStateProvider>
);

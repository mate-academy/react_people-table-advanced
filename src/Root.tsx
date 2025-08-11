import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="people/:slug" element={<PeoplePage />} />
        <Route
          path="*"
          element={
            <main className="section">
              <div className="container">
                <h1 className="title">Page not found</h1>
              </div>
            </main>
          }
        />
      </Route>
    </Routes>
  </Router>
);

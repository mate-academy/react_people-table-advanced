import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home?" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

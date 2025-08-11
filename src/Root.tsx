import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { App } from './App';
import { Home } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace={true} />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

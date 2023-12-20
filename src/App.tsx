import './App.scss';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { PeoplePage } from './pages/PeoplePage';
import { HomePage } from './pages/HomePage';
import { Page404 } from './pages/Page404';
import { Header } from './components/Header';

export const App = () => (
  <div data-cy="app">
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route path=":humanId?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Router>
  </div>
);

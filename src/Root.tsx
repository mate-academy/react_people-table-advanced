import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './components/ErrorPage';
import { Home } from './components/Home';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/people/:selected?" element={<PeoplePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);

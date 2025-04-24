import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
import { RedirectToHomePage } from './components/RedirectToHomePage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<RedirectToHomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slugName" element={''} />
          // I don't know what to put here
        </Route>
        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </Router>
);

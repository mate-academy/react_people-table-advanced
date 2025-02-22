import { Routes, Route, Navigate } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { Error } from './components/Error';
import { Home } from './components/Home';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </Router>
);

import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from '../App';
import { PeoplePage } from '../components/PeoplePage';
import { HomePage } from '../components/HomePage';

export const PeopleApp = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="/people">
          <Route path=":slugLink?" element={<PeoplePage />} />
        </Route>

        <Route path="home" element={<Navigate to="/" relative="path" />} />
        <Route path="*" element={<h1 className="title">Page not found</h1>} />

        <Route path="people" />
      </Route>
    </Routes>
  </Router>
);

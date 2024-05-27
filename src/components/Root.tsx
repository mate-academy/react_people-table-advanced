import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from '../App';
import { PageNotFound } from '../Pages/PageNotFound/PageNotFound';
import { HomePage } from '../Pages/HomePage/HomePage';
import { PeoplePage } from '../Pages/PeoplePage/PeoplePage';


export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />

        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
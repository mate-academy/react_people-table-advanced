import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './page/HomePage';
import { PeoplePages } from './page/PeoplePages';
import { ErorrPage } from './page/ErrorPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />

          <Route path="people">
            <Route path=":slug?" element={<PeoplePages />} />
          </Route>

          <Route path="*" element={<ErorrPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

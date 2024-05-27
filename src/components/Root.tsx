import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { ErrorPage } from './ErrorPage/ErrorPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

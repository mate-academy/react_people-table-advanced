import {
  HashRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './HomePage';
import { PeoplePage } from './PeoplePage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="home" element={(<Navigate to="/" replace />)} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

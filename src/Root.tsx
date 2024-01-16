import {
  Navigate,
  Route,
  HashRouter,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './AppPages/HomePage';
import { PeoplePage } from './AppPages/PeoplePage';
import { PageNotFound } from './AppPages/PageNotFound';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to=".." />} />

        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </HashRouter>
);

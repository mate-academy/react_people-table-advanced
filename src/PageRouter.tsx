import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { Home } from './components/Home';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

export const PageRouter = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/home" element={<Navigate replace to="/" />} />
      <Route path="people" element={<PeoplePage />}>
        <Route path=":personID" element={<PeoplePage />} />
        {/* <Route path=":searchQuery" element={<PeoplePage />} />
        <Route path=":sex" element={<PeoplePage />} /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

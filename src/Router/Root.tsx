import { Navigate, Route, HashRouter, Routes } from 'react-router-dom';

import { App } from '../App';
import { HomePage } from '../Pages/HomePage';
import { PeoplePage } from '../Pages/PeoplePage';
import { ErrorPage } from '../Pages/ErrorPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

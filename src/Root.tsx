import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './page/PeoplePage';
import { NotFoundPage } from './page/NotFoundPage';
import { HomePage } from './page/HomePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </HashRouter>
);

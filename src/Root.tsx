import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/Page/PeoplePage';
import { NotFoundPage } from './components/Page/NotFoundPage';
import { HomePage } from './components/Page/HomePage';

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

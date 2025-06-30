import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route index element={<HomePage />} />
        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<h1 className="title">Page not found</h1>} />
      </Route>
    </Routes>
  </HashRouter>
);

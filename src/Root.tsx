import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/Loader/HomePage';
import { ErrorPage } from './components/ErrorPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </HashRouter>
);

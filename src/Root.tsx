import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFound } from './pages/NotFound';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<Navigate replace to="/" />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

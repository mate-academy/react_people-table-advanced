import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from './HomePage';
import { PageNotFound } from './NotFoundPage';
import { PeoplePage } from './PeoplePage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate replace to="/" />} />
          <Route path="people" element={<PeoplePage />}>
            <Route path=":personSlug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

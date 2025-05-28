import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';
import { HomePage } from './components/HomePage';
export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="people/:slug?" element={<PeoplePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="*"
            element={
              <h1 data-cy="nav" className="title">
                Page not found
              </h1>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
};

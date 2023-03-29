import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Page } from './types/Page';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route
              path={Page.home}
              element={<h1 className="title">Home page</h1>}
            />

            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path={Page.people} element={<PeoplePage />}>
              <Route index element={<PeoplePage />} />
              <Route path=":tabId" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/people" element={<PeoplePage />}>
                <Route index />
                <Route path=":personSlug?" />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

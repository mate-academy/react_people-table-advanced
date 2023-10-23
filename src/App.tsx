import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/HomePage';
import { PageNotFound } from './components/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<PageNotFound />}
            />
            <Route
              path="/people"
              element={<PeoplePage />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};

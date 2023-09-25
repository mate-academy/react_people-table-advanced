import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/Pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './components/Pages/HomePage';
import { NothingFound } from './components/Pages/NotFind';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":userSlug" element={<PeoplePage />} />
            </Route>
            <Route
              path="*"
              element={<NothingFound />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

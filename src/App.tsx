import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/NavBar/Navbar';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":personSlug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  </div>
);

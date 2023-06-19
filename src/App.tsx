import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage';
import { NavBar } from './components/NavBar';

import './App.scss';
import { HomePage } from './Pages/HomePage';
import { PageNotFound } from './Pages/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <div className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<PageNotFound />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

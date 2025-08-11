import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route index element={<HomePage />} />
          <Route path="people">
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

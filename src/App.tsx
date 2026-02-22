import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';

const HomeRedirect = () => {
  const { search } = useLocation();

  return <Navigate to={{ pathname: '/', search }} replace />;
};

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route index element={<HomePage />} />

            <Route path="home" element={<HomeRedirect />} />

            <Route path="people" element={<PeoplePage />} />
            <Route path="people/:slug" element={<PeoplePage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

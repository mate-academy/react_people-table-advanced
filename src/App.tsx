import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { NavBar } from './components/NavBar';

export const App = () => {
  const location = useLocation();

  if (location.pathname === '/home') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="people" element={<PeoplePage />}>
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

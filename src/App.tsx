import { PeoplePage } from './pages/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/people" element={<PeoplePage />}>
              <Route path=":selectedSlug" element={<PeoplePage />} />
            </Route>
          </Routes>
          {/* <h1 className="title">Home Page</h1>
          <h1 className="title">Page not found</h1>
          <PeoplePage /> */}
        </div>
      </div>
    </div>
  );
};

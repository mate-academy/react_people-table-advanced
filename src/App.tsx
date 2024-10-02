import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { NotFoundPage } from './components/PageNotFound';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace={true} />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":personSlug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

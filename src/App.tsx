import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';

import './App.scss';
// eslint-disable-next-line import/order
import { Route, Routes, useLocation } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  const location = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <h1 className="title">{location.pathname}</h1>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

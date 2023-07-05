import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from 'pages/PeoplePage';
import { HomePage } from 'pages/HomePage';
import { PageNotFound } from 'pages/PageNotFound';

import { Navbar } from 'components/Navbar/Navbar';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="home" element={<Navigate to="/" replace />} />
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

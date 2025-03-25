import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import HomePage from './page/HomePage';
import PageNotFound from './page/PageNotFound';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

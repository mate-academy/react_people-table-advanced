import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { PageNotFound } from './pages/PageNotFound';

import { Navbar } from './components/Navbar';

import './App.scss';

export const App: React.FC = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate replace to="/" />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  </div>
);

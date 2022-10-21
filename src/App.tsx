import {
  Route, Routes, Navigate,
} from 'react-router-dom';

import './App.scss';
import { PeoplePage } from './Pages';
import { MainNav } from './components/MainNav';
import { PageNotFound } from './components/PageNotFound';
import { HomePage } from './components/HomePage';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);

import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PeoplePage } from './pages/PeoplePage';

import './App.scss';
import { Layout } from './pages/Layout';
import { Home } from './pages/Home';

export const App: FC = () => {
  return (
    <div data-cy="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path="/people/:personSlug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};

import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePageComponent } from './components/HomePageComponent';
import { NotFoundPage } from './components/NotFoundPage';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePageComponent />}>
          <Route path="/home" element={<Navigate to={'/'} />} />
        </Route>
        <Route path="/people" element={<PeoplePage />}>
          <Route path="/people/:id" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

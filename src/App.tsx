import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
// Components
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';

const App: React.FC = () => (
  <>
    <Header />

    <section>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate replace to="/" />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </section>
  </>
);

export default App;

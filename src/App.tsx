import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { PeoplePage } from './components/PeoplePage';

const App: React.FC = () => (
  <div className="App">
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/people/*" element={<PeoplePage />}>
        <Route path=":slug" element={<PeoplePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />

      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  </div>
);

export default App;

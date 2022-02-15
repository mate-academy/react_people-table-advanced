import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFoundPage } from './components/NotFoundPage';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/people" element={<PeoplePage />}>
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

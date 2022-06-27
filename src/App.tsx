import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import 'bulma';

import { Header } from './components/Header/Header';
import { HomePage } from './components/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:slug" element={<PeoplePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;

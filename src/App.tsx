import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import PeoplePage from './components/PeoplePage/PeoplePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <h1 className="App__title">
      People table application
    </h1>
    <Header />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people/*" element={<PeoplePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </div>
);

export default App;

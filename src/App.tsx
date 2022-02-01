import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './component/Header';
import { HomePege } from './component/HomePage';
import { PeoplePage } from './component/PeoplePage';

import 'bulma';

import './App.scss';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <div className="page">
      <Routes>
        <Route path="/" element={<HomePege />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>
      </Routes>

    </div>
  </div>
);

export default App;

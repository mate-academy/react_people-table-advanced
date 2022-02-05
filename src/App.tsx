import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Header } from './Header/Header';
import { HomePage } from './HomePage/HomePage';
import { PeoplePage } from './PeoplePage/PeoplePage';
import { PageNotFound } from './PageNotFound/PageNotFound';

const App: React.FC = () => (
  <div className="App">
    <Header />
    <div className="App__content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="people" element={<PeoplePage />}>
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </div>
);

export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { PageNotFound } from './components/PageNotFound';

import './App.scss';

const navList = [
  {
    href: '/',
    title: 'Home',
  },
  {
    href: '/people',
    title: 'People',
  },
];

export const App = () => (
  <div className="App" data-cy="app">
    <Navbar navList={navList} />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" />} />
      <Route path="people">
        <Route index element={<PeoplePage />} />
        <Route path=":slug" element={<PeoplePage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </div>
);

import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './Pages/PeoplePage';
// import { NotFound } from './pages/NotFound';
// import { HomePage } from './pages/HomePage';
import { App } from './App';
import React from 'react';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug?" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

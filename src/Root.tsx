import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { PeoplePage } from './components/PeoplePage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<h1 className="title">Home Page</h1>} />

          <Route path="home" element={<Navigate to={'/'} />} />

          <Route path="people" element={<PeoplePage />}>
            <Route path=":slugParam" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
};

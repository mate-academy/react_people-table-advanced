import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';
import { Layout } from './components/Layout';

export const App = () => {
  return (
    <div data-cy="app">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1 className="title">Home Page</h1>} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Route>

        <Route path="home" element={<Navigate replace to="/" />} />

        <Route path="/people" element={<Layout />}>
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
      </Routes>
    </div>
  );
};

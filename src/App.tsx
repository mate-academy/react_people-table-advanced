import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <section className="section">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/people/:slug?" element={<PeoplePage />}></Route>
          <Route path="/home" element={<Navigate to="/" replace />}></Route>
          <Route
            path="*"
            element={<h1 className="title">Page not found</h1>}
          ></Route>
        </Routes>
      </section>
    </div>
  );
};

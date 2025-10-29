import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';

const NotFound = () => (
  <div data-cy="notFound">
    <h1 className="title">Page not found</h1>
  </div>
);

const HomePage = () => (
  <div data-cy="homePage">
    <h1 className="title">Home Page</h1>
  </div>
);

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/people/:slug" element={<PeoplePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  </div>
);

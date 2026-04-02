import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

const HomePage = () => <h1 className="title">Home Page</h1>;

const NotFoundPage = () => <h1 className="title">Page not found</h1>;

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

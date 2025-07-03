import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';

import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';

const HomePage = () => {
  return <h1 className="title">Home Page</h1>;
};

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

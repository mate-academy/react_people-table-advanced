import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';

const Home = () => <h1 className="title">Home Page</h1>;
const NotFound = () => <h1 className="title">Page not found</h1>;

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:slug" element={<PeoplePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

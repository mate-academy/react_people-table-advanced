import { Navigate, Route, Routes } from 'react-router-dom';

// import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';

import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />

          <Route path="/people" element={<PeoplePage />} />

          <Route path="/people/:slug" element={<PeoplePage />} />

          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);

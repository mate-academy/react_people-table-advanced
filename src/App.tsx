import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

const HomePage = () => (
  <div className="container">
    <h1 className="title">Home Page</h1>
  </div>
);

const NotFoundPage = () => (
  <div className="container">
    <h1 className="title">Page not found</h1>
  </div>
);

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <div className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

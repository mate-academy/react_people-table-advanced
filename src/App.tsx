import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.scss';

const Home = () => {
  return (
    <div>
      <h1 className="title">Home Page</h1>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1 className="title">Page not found</h1>
    </div>
  );
};

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} />

          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

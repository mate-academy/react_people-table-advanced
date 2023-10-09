import './App.scss';
import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import { NotFound } from './components/NotFound';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

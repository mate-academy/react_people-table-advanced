import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './App.scss';

import { Navbar } from './components/Navbar';

import { HomePage } from './pages/HomePage';
import { ErrorPage } from './pages/ErrorPage';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">

    <Navbar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/people">
            <Route path=":slug?" element={<PeoplePage />} />

          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

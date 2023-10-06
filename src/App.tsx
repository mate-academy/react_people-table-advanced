import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PeoplePage } from './components/pages/PeoplePage';
import { HomePage } from './components/pages/HomePage';
import { ErrorPage } from './components/pages/ErrorPage';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="people">
            <Route
              path=":slugId?"
              element={<PeoplePage />}
            />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
};

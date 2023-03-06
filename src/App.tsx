import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage/PeoplePage';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <main className="section">

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":slug" element={<PeoplePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </main>
    </div>
  );
};

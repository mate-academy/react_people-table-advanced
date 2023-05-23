import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { PeoplePage } from './pages/People/PeoplePage';
import { HomePage } from './pages/Home/HomePage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Navbar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <main className="section">
      <div className="container">
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
    </main>
  </div>
);

import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { TablePage } from './Pages/TablePage';
import { HomePage } from './Pages/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { NotFoundPage } from './Pages/NotFoundPage';

export const App: React.FC = () => (
  <div data-cy="app">
    <NavBar />
    <main className="section">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        <Route path="people">
          <Route index element={(<TablePage />)} />
          <Route path=":personSlug" element={(<TablePage />)} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  </div>
);

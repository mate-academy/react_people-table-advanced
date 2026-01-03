import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { PeoplePage } from './pages/PeoplePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

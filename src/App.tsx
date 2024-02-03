import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './components/PeoplePage';
import { NavBar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="people">
          <Route path=":slug?" element={<PeoplePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

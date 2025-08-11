import { Navbar } from './components/Navbar';
import './App.scss';
import HomePage from './pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="people">
            <Route index element={<PeoplePage />} />
            <Route path=":selectedPerson" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

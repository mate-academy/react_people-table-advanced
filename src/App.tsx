import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import './App.scss';

export const App = () => (
  <div data-cy="app">
    <Navbar />

    <div className="section">
      <div className="container mt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people">
            <Route index element={<PeoplePage />} />
            <Route path=":selectedPerson" element={<PeoplePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  </div>
);

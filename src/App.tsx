import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage';
import { Navbar } from './components/Navbar';
import { PeopleFilters } from './components/PeopleFilters';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <PeopleFilters />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/people/:selectedPerson?" element={<PeoplePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>
  </div>
);

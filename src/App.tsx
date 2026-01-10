import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Person } from './types/Person';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';

import './App.scss';

export const App = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/people"
              element={
                <PeoplePage
                  selectedPerson={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                />
              }
            />
            <Route
              path="/people/:slug"
              element={
                <PeoplePage
                  selectedPerson={selectedPerson}
                  setSelectedPerson={setSelectedPerson}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

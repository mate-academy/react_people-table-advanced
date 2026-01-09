import { useState } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Person } from './types/Person';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PeoplePage from './pages/PeoplePage';
import NotFoundPage from './pages/NotFoundPage';

import './App.scss';

const PeoplePageWrapper = ({
  selectedPerson,
  setSelectedPerson,
}: {
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
}) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <PeoplePage
      selectedPerson={selectedPerson}
      setSelectedPerson={setSelectedPerson}
      slug={slug || null}
    />
  );
};

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
                <PeoplePageWrapper
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

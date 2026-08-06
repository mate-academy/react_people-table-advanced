import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import { getPeople } from './api';
import { Person } from './types/Person';
import { Filter } from './types/Filter';
import { NotFoundPage } from './components/Loader/NotFoundPage';
import { PeoplePage } from './components/Loader/PeoplePage';
import { HomePage } from './components/Loader/HomePage';
import { Navbar } from './Navbar';

import './App.scss';

export const App: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [titleFilter, setTitleFilter] = useState('');
  const [century, setCentury] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    true,
  ]);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    const matchesSex =
      filter === Filter.All ||
      (filter === Filter.Male && person.sex === 'm') ||
      (filter === Filter.Female && person.sex === 'f');

    const matchesName = person.name
      .toLowerCase()
      .includes(titleFilter.trim().toLowerCase());

    const centuryOfBorn = Math.ceil(person.born / 100);

    const centuryfilter =
      (century[0] === false &&
        century[1] === false &&
        century[2] === false &&
        century[3] === false &&
        century[4] === false) ||
      (centuryOfBorn === 16 && century[0] === true) ||
      (centuryOfBorn === 17 && century[1] === true) ||
      (centuryOfBorn === 18 && century[2] === true) ||
      (centuryOfBorn === 19 && century[3] === true) ||
      (centuryOfBorn === 20 && century[4] === true);

    return matchesSex && matchesName && centuryfilter;
  });

  return (
    <HashRouter>
      <div data-cy="app">
        <Navbar />
        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />

              <Route path="/people">
                <Route
                  path=":slug?"
                  element={
                    <PeoplePage
                      people={visiblePeople}
                      loading={loading}
                      errorMessage={errorMessage}
                      setFilter={setFilter}
                      filter={filter}
                      setTitleFilter={setTitleFilter}
                      titleFilter={titleFilter}
                      century={century}
                      setCentury={setCentury}
                    />
                  }
                />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </HashRouter>
  );
};

import './App.scss';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { Navbar } from './components/Navbar/Navbar';
import { FilterSexValues, SexFilter } from './types/SexFilter';
import { CenturyFilter } from './types/CenturyFilter';

export const App = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [filteredPeople, setFilteredPeople] = useState<Person[] | null>(null);
  const [sexFilter, setSexFilter] = useState<SexFilter>(FilterSexValues.ALL);
  const [centuryFilter, setCenturyFilter] = useState<CenturyFilter[]>([]);
  const [isLoadingPeople, setIsLoadingPeople] = useState<boolean>(false);
  const [fetchPeopleError, setFetchPeopleError] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoadingPeople(true);
    setFetchPeopleError(false);

    getPeople()
      .then((data: Person[]) => {
        setPeople(data);
      })
      .catch(() => {
        setFetchPeopleError(true);
      })
      .finally(() => setIsLoadingPeople(false));
  }, []);

  useEffect(() => {
    if (people === null) {
      return;
    }

    const filterByCentury = (persons: Person[]): Person[] => {
      const centuryFiltersOn = [...centuryFilter];

      const newPersons = persons.filter(person => {
        const personBornCentury = Math.ceil(person.born / 100);

        return centuryFiltersOn.some(
          filter => filter === personBornCentury.toString(),
        );
      });

      return newPersons;
    };

    let newPeople = [...people];

    newPeople = people.filter(person => {
      const dataSearch =
        `${person.name} ${person.fatherName} ${person.motherName}`.toLowerCase();

      return dataSearch.includes(query.toLowerCase());
    });

    switch (sexFilter) {
      case FilterSexValues.ALL:
        break;
      case FilterSexValues.MALE:
        newPeople = newPeople.filter(
          person => FilterSexValues.MALE === person.sex,
        );
        break;
      case FilterSexValues.FEMALE:
        newPeople = newPeople.filter(
          person => FilterSexValues.FEMALE === person.sex,
        );
        break;
    }

    if (centuryFilter.length > 0) {
      newPeople = filterByCentury(newPeople);
    }

    setFilteredPeople(newPeople);
  }, [people, sexFilter, centuryFilter, query]);

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <Navbar />
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/home" element={<Navigate to={'/'} replace />}></Route>

            <Route
              path="/people"
              element={
                <PeoplePage
                  isLoadingPeople={isLoadingPeople}
                  fetchPeopleError={fetchPeopleError}
                  sexFilter={sexFilter}
                  centuryFilter={centuryFilter}
                  setSexFilter={setSexFilter}
                  setCenturyFilter={setCenturyFilter}
                  nameFilter={query}
                  setNameFilter={() => {}}
                />
              }
            >
              <Route
                index
                element={
                  <PeopleTable
                    people={people}
                    filteredPeople={filteredPeople}
                  />
                }
              ></Route>
              <Route
                path=":slug"
                element={
                  <PeopleTable
                    people={people}
                    filteredPeople={filteredPeople}
                  />
                }
              ></Route>
            </Route>

            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

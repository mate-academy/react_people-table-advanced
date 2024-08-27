import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterSex, setFilterSex] = useState('');
  const [query, setQuery] = useState('');
  const [centuries, setCenturies] = useState<string[]>([]);

  console.log(centuries);

  useEffect(() => {
    fetch('/api/people.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
      .then(data => {
        setPeopleFromServer(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const hasPeople = peopleFromServer.length > 0;

  // Фильтрация по полу
  const filteredBySex = filterSex
    ? peopleFromServer.filter(person => person.sex === filterSex)
    : peopleFromServer;

  const filteredByQuery = query
    ? filteredBySex.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    )
    : filteredBySex;

  const filteredByCenturies =
    centuries.length > 0
      ? filteredByQuery.filter(person =>
        centuries.some(
          century =>
            person.born >= (+century - 1) * 100 + 1 &&
              person.born <= +century * 100,
        ),
      )
      : filteredByQuery;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              setCenturies={setCenturies}
              setQuery={setQuery}
              setFilterSex={setFilterSex}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && !error && <Loader />}

              {error && !loading && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !hasPeople && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && hasPeople && filteredByCenturies.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && filteredByCenturies.length > 0 && (
                <PeopleTable peopleFromServer={filteredByCenturies} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

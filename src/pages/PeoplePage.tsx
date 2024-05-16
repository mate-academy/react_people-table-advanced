import { useCallback, useEffect, useMemo, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase();
  const sex = searchParams.get('sex') || null;
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  const getFilteredPeople = useCallback(() => {
    let visiblePeople = [...people];

    if (query) {
      visiblePeople = visiblePeople.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      visiblePeople = visiblePeople.filter(person => person.sex === sex);
    }

    if (centuries.length) {
      visiblePeople = visiblePeople.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return visiblePeople;
  }, [query, sex, centuries, people]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    getPeople()
      .then(peopleFromServer => getPeopleWithParents(peopleFromServer))
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = getFilteredPeople();

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!people.length && !error && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

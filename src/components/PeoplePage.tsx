import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries').map(Number);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      result = people.filter(
        person =>
          person.name.toLowerCase().includes(lowerCaseQuery) ||
          person.motherName?.toLowerCase().includes(lowerCaseQuery) ||
          person.fatherName?.toLowerCase().includes(lowerCaseQuery),
      );
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100)),
      );
    }

    return result;
  }, [people, query, sex, centuries]);

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

              {!loading && error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && !filteredPeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !error && !!filteredPeople.length && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);
    getPeople()
      .then(loadedPeople => {
        setPeople(loadedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const lowerQuery = query.toLowerCase();
        const matchesQuery = [
          person.name,
          person.motherName,
          person.fatherName,
        ].some(val => val && val.toLowerCase().includes(lowerQuery));

        if (!matchesQuery) {
          return false;
        }
      }

      if (centuries.length > 0) {
        const personCentury = Math.ceil(person.born / 100).toString();

        if (!centuries.includes(personCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sortField) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      const valA = a[sortField as keyof Person];
      const valB = b[sortField as keyof Person];

      if (valA === undefined || valB === undefined) {
        return 0;
      }

      let comparison = 0;

      if (typeof valA === 'number' && typeof valB === 'number') {
        comparison = valA - valB;
      } else {
        comparison = String(valA).localeCompare(String(valB));
      }

      return order === 'desc' ? -comparison : comparison;
    });
  }, [filteredPeople, sortField, order]);

  const hasNoPeople = !loading && !error && people.length === 0;
  const showContent = !loading && !error && people.length > 0;
  const hasNoFilteredPeople = showContent && filteredPeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showContent && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showContent && (
                <>
                  {hasNoFilteredPeople && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  <PeopleTable people={sortedPeople} allPeople={people} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

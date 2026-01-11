import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import React from 'react';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const { personName } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = useMemo(() => {
    const filtered = people.filter(person => {
      const matchesQuery = [person.name, person.fatherName, person.motherName]
        .filter(Boolean)
        .some(name => name!.toLowerCase().includes(query.toLowerCase()));

      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(Math.ceil(person.born / 100).toString());

      const matchesSex = !sex || person.sex === sex;

      return matchesQuery && matchesCentury && matchesSex;
    });

    if (!sort) {
      return filtered;
    }

    return [...filtered].sort((a, b) => {
      let result = 0;

      if (sort === 'born' || sort === 'died') {
        result = (a[sort] ?? 0) - (b[sort] ?? 0);
      }

      if (sort === 'name' || sort === 'sex') {
        result = a[sort].localeCompare(b[sort]);
      }

      return order === 'desc' ? -result : result;
    });
  }, [people, query, centuries, sex, sort, order]);

  const noResults =
    !loading && !loadError && people.length > 0 && filteredPeople.length === 0;

  // useEffect(() => {
  //   if (query && filteredPeople.length === 0) {
  //     setErrorMessage(
  //       'There are no people matching the current search criteria',
  //     );
  //   } else {
  //     setErrorMessage('');
  //   }
  // }, [query, filteredPeople.length]);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setLoadError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="column">
          {loading && <Loader />}

          {!loading && loadError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {loadError}
            </p>
          )}

          {!loading && !loadError && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!loading && !loadError && people.length > 0 && (
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="box table-container">
                {noResults ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : (
                  <PeopleTable
                    people={filteredPeople}
                    allPeople={people}
                    activePersonId={personName}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

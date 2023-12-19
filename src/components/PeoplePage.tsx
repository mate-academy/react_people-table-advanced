import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries' || []);
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      const trimedQuery = query.trim().toLowerCase();

      filtered = filtered
        .filter(person => person.name.toLowerCase().includes(trimedQuery)
          || person.motherName?.toLowerCase().includes(trimedQuery)
          || person.fatherName?.toLowerCase().includes(trimedQuery));
    }

    if (sex) {
      filtered = filtered
        .filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person => centuries
        .includes(Math.ceil(person.born / 100).toString()));
    }

    if (sortField && !order) {
      filtered = filtered.sort((a, b) => {
        switch (sortField) {
          case 'name':
          case 'sex':
            return a[sortField].localeCompare(b[sortField]);

          case 'born':
          case 'died':
            return a[sortField] - b[sortField];

          default:
            return 0;
        }
      });
    }

    if (sortField && order) {
      filtered = filtered.reverse();
    }

    return filtered;
  }, [centuries, order, people, query, sex, sortField]);

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
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading
                && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {(!filteredPeople.length && !isLoading)
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {((filteredPeople.length > 0 && !isLoading))
              && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

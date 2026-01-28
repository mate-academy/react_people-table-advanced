import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    let result = [...people];

    // Фільтрація
    if (query) {
      result = result.filter(p => {
        const fieldsToSearch = [p.name, p.motherName, p.fatherName];

        return fieldsToSearch.some(field =>
          field?.toLowerCase().includes(query),
        );
      });
    }

    // Фільтр по статі (SexFilter)
    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    // Сортування
    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person] ?? '';
        const valB = b[sort as keyof Person] ?? '';

        const comparison =
          typeof valA === 'string'
            ? (valA as string).localeCompare(valB as string)
            : (valA as number) - (valB as number);

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, query, centuries, sort, order, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && (
                <>
                  {people.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {people.length > 0 && visiblePeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {visiblePeople.length > 0 && (
                    <PeopleTable people={visiblePeople} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { PeopleFilters } from '../PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const getCentury = (year: number) => Math.ceil(year / 100);
  const query = searchParams.get('query') || '';
  const visiblePeople = React.useMemo(() => {
    let sorted = [...peoples];
    const normalizedQuery = query.trim().toLowerCase();

    if (sort) {
      if (!sort || !order) {
        return peoples;
      }

      sorted.sort((a, b) => {
        const valueA = a[sort as keyof Person];
        const valueB = b[sort as keyof Person];

        if (typeof valueA === 'string') {
          return order === 'desc'
            ? String(valueB).localeCompare(String(valueA))
            : String(valueA).localeCompare(String(valueB));
        }

        return order === 'desc'
          ? Number(valueB) - Number(valueA)
          : Number(valueA) - Number(valueB);
      });
    }

    if (sex) {
      sorted = sorted.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      sorted = sorted.filter(person =>
        centuries.includes(String(getCentury(person.born))),
      );
    }

    if (query) {
      sorted = sorted.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    return sorted;
  }, [peoples, sort, order, sex, centuries, query]);

  useEffect(() => {
    getPeople()
      .then(data => setPeoples(data))
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {errorMessage && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {errorMessage}
                    </p>
                  )}

                  {peoples.length === 0 && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                  <PeopleTable peoples={visiblePeople} slug={slug} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

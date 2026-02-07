import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

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

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      const normalizedQuery = query.toLowerCase().trim();

      result = result.filter(person => {
        const nameMatch = person.name.toLowerCase().includes(normalizedQuery);

        const motherMatch = person.motherName
          ?.toLowerCase()
          .includes(normalizedQuery);
        const fatherMatch = person.fatherName
          ?.toLowerCase()
          .includes(normalizedQuery);

        return nameMatch || motherMatch || fatherMatch;
      });
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    if (sort) {
      result.sort((p1, p2) => {
        const field1 = p1[sort as keyof Person];
        const field2 = p2[sort as keyof Person];

        if (field1 === field2) {
          return 0;
        }

        if (field1 === undefined || field1 === null) {
          return 1;
        }

        if (field2 === undefined || field2 === null) {
          return -1;
        }

        if (typeof field1 === 'string' && typeof field2 === 'string') {
          return field1.localeCompare(field2);
        }

        return (field1 as number) - (field2 as number);
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, query, sort, order, centuries, sex]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* eslint-disable */}
              {!loading &&
                !error &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
              )}
              {/* eslint-enable */}

              {!loading && !error && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

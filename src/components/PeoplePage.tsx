import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoading(true);
    setError('');

    getPeople()
      .then(setPeople)
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (query) {
      result = result.filter(
        ppl =>
          ppl.name.toLowerCase().includes(query) ||
          ppl.fatherName?.toLowerCase().includes(query) ||
          ppl.motherName?.toLowerCase().includes(query),
      );
    }

    if (sex === 'm' || sex === 'f') {
      result = result.filter(ppl => ppl.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(ppl => {
        const century = Math.floor(ppl.born / 100) + 1;

        return centuries.includes(century);
      });
    }

    if (sort) {
      result.sort((a, b) => {
        const x = a[sort as keyof Person];
        const y = b[sort as keyof Person];

        if (x == null && y == null) {
          return 0;
        }

        if (x == null) {
          return 1;
        }

        if (y == null) {
          return -1;
        }

        if (x < y) {
          return -1;
        }

        if (x > y) {
          return 1;
        }

        return 0;
      });

      if (order === 'desc') {
        result.reverse();
      }
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

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
                  {error}
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !error &&
                people.length > 0 &&
                filteredPeople.length === 0 && (
              /* eslint-disable */
                  <p>
                    There are no people matching the current search criteria
                  </p>
                  /* eslint-disable */
                )}

              {!loading && !error && people.length > 0 && (
                <PeopleTable people={filteredPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    let result = [...people];

    const sex = searchParams.get('sex');

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    const query = searchParams.get('query');

    if (query) {
      const lowerQuery = query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(lowerQuery) ||
          person.motherName?.toLowerCase().includes(lowerQuery) ||
          person.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries?.includes(String(century));
      });
    }

    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (sort) {
      result.sort((a, b) => {
        let aValue = a[sort as keyof Person];
        let bValue = b[sort as keyof Person];

        if (aValue === undefined) {
          aValue = '';
        }

        if (bValue === undefined) {
          bValue = '';
        }

        const aStr = String(aValue);
        const bStr = String(bValue);

        if (order === 'desc') {
          return bStr.localeCompare(aStr, undefined, { numeric: true });
        }

        return aStr.localeCompare(bStr, undefined, { numeric: true });
      });
    }

    return result;
  }, [people, searchParams]);

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

              {error && !loading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>

              {!loading && !error && people.length > 0 && (
                <>
                  <PeopleTable
                    people={filteredAndSortedPeople}
                    selectedSlug={slug || null}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

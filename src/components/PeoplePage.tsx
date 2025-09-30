import React, { useCallback, useMemo } from 'react';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = (searchParams.get('sort') as keyof Person) || '';
  const order = searchParams.has('order');

  const sortPeople = useCallback(
    (a: Person, b: Person) => {
      if (!sort) {
        return 0;
      }

      const aVal = a[sort];
      const bVal = b[sort];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }

      return 0;
    },
    [sort],
  );

  const filteredAndSortPeoples = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    const filteredPeoples = peoples.filter(people => {
      const normalizedBorn = Math.ceil(people.born / 100);

      const isCenturie =
        centuries.length === 0
          ? true
          : centuries.some(centurie => normalizedBorn === +centurie);

      if (
        (people.name.toLowerCase().includes(normalizedQuery) ||
          people.motherName?.toLowerCase().includes(normalizedQuery) ||
          people.fatherName?.toLowerCase().includes(normalizedQuery)) &&
        isCenturie &&
        (people.sex === sex || !sex)
      ) {
        return true;
      }

      return false;
    });

    const sortFilteredPeoples = sort
      ? filteredPeoples.sort((a, b) => sortPeople(a, b))
      : filteredPeoples;

    return order ? sortFilteredPeoples.reverse() : sortFilteredPeoples;
  }, [centuries, peoples, query, sex, sort, order]);

  async function uploadPeoples() {
    setLoading(true);
    setError(false);
    try {
      const responsedPeoples = await getPeople();
      setPeoples(responsedPeoples);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    uploadPeoples()
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : error ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : peoples.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : (
                <PeopleTable peoples={filteredAndSortPeoples} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type PersonFromApi = Omit<Person, 'slug'>;

const createSlug = (person: PersonFromApi) => {
  return `${person.name.toLowerCase().replace(/\s/g, '-')}-${person.born}`;
};

const ALLOWED_SORT_FIELDS = ['name', 'sex', 'born', 'died'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then((data: PersonFromApi[]) => {
        const peopleWithSlugs = data.map(p => ({
          ...p,
          slug: createSlug(p),
        }));

        setPeople(peopleWithSlugs);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = useMemo(() => {
    let filteredPeople = [...people];

    if (query) {
      const lowerQuery = query.toLowerCase();

      filteredPeople = filteredPeople.filter(
        p =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.motherName?.toLowerCase().includes(lowerQuery) ||
          p.fatherName?.toLowerCase().includes(lowerQuery),
      );
    }

    if (sex) {
      filteredPeople = filteredPeople.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(p => {
        const century = Math.ceil(p.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sort && ALLOWED_SORT_FIELDS.includes(sort)) {
      filteredPeople.sort((p1, p2) => {
        const val1 = p1[sort as keyof Person];
        const val2 = p2[sort as keyof Person];

        if (val1 == null && val2 != null) {
          return 1;
        }

        if (val1 != null && val2 == null) {
          return -1;
        }

        if (val1 == null && val2 == null) {
          return 0;
        }

        if (typeof val1 === 'string' && typeof val2 === 'string') {
          return val1.toLowerCase().localeCompare(val2.toLowerCase());
        }

        if (typeof val1 === 'number' && typeof val2 === 'number') {
          return val1 - val2;
        }

        return 0;
      });

      if (order === 'desc') {
        filteredPeople.reverse();
      }
    }

    return filteredPeople;
  }, [people, query, sex, centuries, sort, order]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p data-cy="peopleLoadingError">{error}</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length > 0 && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  allPeople={people}
                  selectedSlug={selectedSlug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

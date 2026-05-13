import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getBorn = (bornYear: number) => {
    return Math.ceil(bornYear / 100);
  };

  const visiblePeople = useMemo(() => {
    let filtered = [...people];

    if (query) {
      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.includes(getBorn(person.born).toString()),
      );
    }

    if (sort) {
      filtered = [...filtered].sort((a, b) => {
        switch (sort) {
          case 'born':
          case 'died':
            return a[sort] - b[sort];

          case 'name':
          case 'sex':
            return a[sort].toLowerCase().localeCompare(b[sort].toLowerCase());

          default:
            return 0;
        }
      });
    }

    if (order === 'desc') {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [query, people, sex, centuries, sort, order]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(receivedPeople => {
        setPeople(receivedPeople);
        setIsLoading(false);
      })
      .catch(() => setErrorMessage('Something went wrong'));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <PeopleTable
              people={visiblePeople}
              errorMessage={errorMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

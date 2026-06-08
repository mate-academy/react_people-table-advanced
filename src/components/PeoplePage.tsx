import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Errors } from '../utils/Errors';
import { Person } from '../types';

import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Errors | ''>('');

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    getPeople()
      .then(data => {
        setPeople(data);

        if (data.length === 0) {
          setErrorMessage(Errors.NoPeopleMessage);
        }
      })
      .catch(() => {
        setErrorMessage(Errors.PeopleLoadingError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredAndSortedPeople = useMemo(() => {
    let result = [...people];

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (query) {
      const q = query.toLowerCase();

      result = result.filter(person => {
        return (
          person.name.toLowerCase().includes(q) ||
          person.motherName?.toLowerCase().includes(q) ||
          person.fatherName?.toLowerCase().includes(q)
        );
      });
    }

    if (centuries.length) {
      result = result.filter(p =>
        centuries.includes(String(Math.ceil(p.born / 100))),
      );
    }

    if (sort) {
      result.sort((a, b) => {
        let cmp = 0;

        switch (sort) {
          case 'name':
          case 'sex':
            cmp = a[sort].localeCompare(b[sort]);
            break;

          case 'born':
          case 'died':
            cmp = a[sort] - b[sort];
            break;
        }

        return order === 'desc' ? -cmp : cmp;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {!isLoading && !errorMessage && people.length > 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable people={filteredAndSortedPeople} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage === Errors.PeopleLoadingError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {errorMessage === Errors.NoPeopleMessage && (
          <p data-cy="noPeopleMessage" className="has-text-info">
            {errorMessage}
          </p>
        )}
      </div>
    </>
  );
};

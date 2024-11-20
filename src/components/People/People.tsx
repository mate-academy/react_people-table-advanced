import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Loader } from '../Loader';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { getSearchWith } from '../../utils/searchHelper';

interface Props {
  setIsActive: (arg: boolean) => void;
}

export const People: React.FC<Props> = ({ setIsActive }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState('');

  let filteredPeople = people;

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      const lowerQuery = query.toLowerCase();

      return (
        person.name.toLowerCase().includes(lowerQuery) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(lowerQuery)) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(lowerQuery))
      );
    });
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.some(centuryStr => {
        const century = parseInt(centuryStr, 10);
        const startYear = (century - 1) * 100 + 1;
        const endYear = century * 100;

        return (
          (person.born >= startYear && person.born <= endYear) ||
          (person.died >= startYear &&
            person.died <= endYear &&
            person.born < startYear &&
            person.died > endYear)
        );
      });
    });
  }

  if (sort) {
    const sortedPeople = [...filteredPeople].sort((person1, person2) => {
      if (sort === 'born' || sort === 'died') {
        if (order === 'desc') {
          return (
            (person2[sort as 'born' | 'died'] ?? 0) -
            (person1[sort as 'born' | 'died'] ?? 0)
          );
        } else {
          return (
            (person1[sort as 'born' | 'died'] ?? 0) -
            (person2[sort as 'born' | 'died'] ?? 0)
          );
        }
      }

      const value1 = person1[sort as keyof Person] as string | undefined;
      const value2 = person2[sort as keyof Person] as string | undefined;

      if (value1 === value2) {
        return 0;
      }

      if (order === 'desc') {
        return value1 && value2 ? (value1 > value2 ? -1 : 1) : 0;
      }

      return value1 && value2 ? (value1 < value2 ? -1 : 1) : 0;
    });

    filteredPeople = sortedPeople;
  }

  function getUpdatedSearchParams(sortField: string): string {
    if (sort === sortField) {
      if (order === 'desc') {
        return getSearchWith(searchParams, { sort: null, order: null });
      }

      return getSearchWith(searchParams, { order: 'desc' });
    }

    return getSearchWith(searchParams, { sort: sortField });
  }

  function getSortIcon(
    sortIcon: string,
    orderIcon: string,
    targetSort: string,
  ): string {
    if (sortIcon === targetSort) {
      if (orderIcon === 'desc') {
        return 'fa-sort-down';
      }

      return 'fa-sort-up';
    }

    return 'fa-sort';
  }

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => (setLoader(false), setIsActive(true)));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">
        {loader && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!errorMessage && people.length === 0 && !loader && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!loader && filteredPeople.length === 0 && !errorMessage && (
          <p>There are no people matching the current search criteria</p>
        )}

        {!loader && filteredPeople.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <Link
                      to={{
                        search: getUpdatedSearchParams('name'),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={`fas ${getSortIcon(sort, order, 'name')}`}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <Link
                      to={{
                        search: getUpdatedSearchParams('sex'),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={`fas ${getSortIcon(sort, order, 'sex')}`}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <Link
                      to={{
                        search: getUpdatedSearchParams('born'),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={`fas ${getSortIcon(sort, order, 'born')}`}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <Link
                      to={{
                        search: getUpdatedSearchParams('died'),
                      }}
                    >
                      <span className="icon">
                        <i
                          className={`fas ${getSortIcon(sort, order, 'died')}`}
                        />
                      </span>
                    </Link>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>
            <tbody>
              {filteredPeople.map(person => (
                <PeopleTable
                  person={person}
                  people={people}
                  key={person.slug}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

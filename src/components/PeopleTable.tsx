import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  filteredPeople: Person[];
}

export const PeopleTable: React.FC<Props> = ({ filteredPeople }) => {
  const [peopleSorted, setPeopleSorted] = useState(filteredPeople);

  // let peopleSorted = filteredPeople;

  const [searchParams] = useSearchParams();

  const handleSort = (way: string): SearchParams => {
    if (searchParams.get('sort') !== way) {
      return { sort: way, order: null };
    }

    if (searchParams.get('sort') === way && !searchParams.has('order')) {
      return { sort: way, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getClass = (way: string) => {
    return classNames('fas', {
      'fa-sort': searchParams.get('sort') !== way,
      'fa-sort-up':
        searchParams.get('sort') === way && !searchParams.has('order'),
      'fa-sort-down':
        searchParams.get('sort') === way && searchParams.has('order'),
    });
  };

  useEffect(() => {
    if (searchParams.has('sort')) {
      const key = searchParams.get('sort') as keyof Person;
      const value = searchParams.get('order');

      setPeopleSorted(currentArray => {
        const sortedArray = [...currentArray].sort((personA, personB) => {
          const one = personA[key];
          const two = personB[key];

          if (typeof one === 'string' && typeof two === 'string') {
            return value === 'desc'
              ? two.localeCompare(one)
              : one.localeCompare(two);
          } else if (typeof one === 'number' && typeof two === 'number') {
            return value === 'desc' ? two - one : one - two;
          } else {
            return 0;
          }
        });

        return sortedArray;
      });
    } else {
      setPeopleSorted(filteredPeople);
    }
  }, [searchParams, filteredPeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={handleSort('name')} className="my-link-class">
                <span className="icon">
                  <i className={getClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={handleSort('sex')} className="my-link-class">
                <span className="icon">
                  <i className={getClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={handleSort('born')} className="my-link-class">
                <span className="icon">
                  <i className={getClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={handleSort('died')} className="my-link-class">
                <span className="icon">
                  <i className={getClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleSorted.map(person => (
          <PersonLink
            person={person}
            key={person.name}
            peopleSorted={peopleSorted}
          />
        ))}
      </tbody>
    </table>
  );
};

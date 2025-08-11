/* eslint-disable jsx-a11y/control-has-associated-label */

import { useCallback } from 'react';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

type Props = {
  persons: Person[];
};

const sortByString = (
  filteredPeople: Person[],
  field: 'name' | 'sex',
  order: string,
) => {
  if (order) {
    return filteredPeople.sort((person1, person2) =>
      person2[field].localeCompare(person1[field]),
    );
  }

  return filteredPeople.sort((person1, person2) =>
    person1[field].localeCompare(person2[field]),
  );
};

const sortByNumber = (
  filteredPeople: Person[],
  field: 'born' | 'died',
  order: string | null,
) => {
  if (order) {
    return filteredPeople.sort(
      (person1, person2) => person2[field] - person1[field],
    );
  }

  return filteredPeople.sort(
    (person1, person2) => person1[field] - person2[field],
  );
};

export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSort = (field: string): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort === field && !order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortingPeople = useCallback(() => {
    const sortedPeoples = [...persons];

    switch (sort) {
      case 'name': {
        return sortByString(sortedPeoples, 'name', order);
      }

      case 'sex': {
        return sortByString(sortedPeoples, 'sex', order);
      }

      case 'born': {
        return sortByNumber(sortedPeoples, 'born', order);
      }

      case 'died': {
        return sortByNumber(sortedPeoples, 'died', order);
      }

      default:
        return sortedPeoples;
    }
  }, [persons, sort, order]);

  const getClassName = (field: string) => {
    return cn('fas', {
      'fa-sort': sort !== field,
      'fa-sort-up': sort === field && !order,
      'fa-sort-down': sort === field && order,
    });
  };

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
              <SearchLink params={getSort('name')}>
                <span className="icon">
                  <i className={getClassName('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSort('sex')}>
                <span className="icon">
                  <i className={getClassName('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSort('born')}>
                <span className="icon">
                  <i className={getClassName('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSort('died')}>
                <span className="icon">
                  <i className={getClassName('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortingPeople().map(person => (
          <PersonInfo person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type SortParams = {
  sortField: string | null;
  descending: string | null;
};

function getPreparedPeople(people: Person[], sortParams: SortParams) {
  const preparedPeople = [...people];
  const { sortField, descending } = sortParams;

  if (sortField) {
    preparedPeople.sort((person1, person2) => {
      switch (sortField) {
        case 'name':
          return person1.name.localeCompare(person2.name);

        case 'sex':
          return person1.sex.localeCompare(person2.sex);

        case 'born':
          return person1.born - person2.born;

        case 'died':
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  if (descending) {
    preparedPeople.reverse();
  }

  return preparedPeople;
}

// function getClass(sortParams: SortParams) {
//   const { sortField, descending } = sortParams;

//   if (sortField && descending) {
//     return 'fas fa-sort-down';
//   }

//   if (sortField && !descending) {
//     return 'fas fa-sort-up';
//   }

//   return 'fas fa-sort';
// }

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const descending = searchParams.get('order');

  const sortName = sortField === 'name' && !descending;
  const sortSex = sortField === 'sex' && !descending;
  const sortBorn = sortField === 'born' && !descending;
  const sortDied = sortField === 'died' && !descending;
  const descSort = sortField && descending;

  const setSortField = (typeSort: string) => {
    if (sortField && !descending) {
      return { sort: `${typeSort}`, order: 'desc' };
    }

    if (sortField && descending) {
      return { sort: null, order: null };
    }

    return { sort: `${typeSort}`, order: null };
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
              <SearchLink params={setSortField('name')}>
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sortName,
                      'fa-sort-down': descSort,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={setSortField('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sortSex,
                      'fa-sort-down': descSort,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={setSortField('born')}>
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sortBorn,
                      'fa-sort-down': descSort,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={setSortField('died')}>
                <span className="icon">
                  <i
                    className={cn('fas fa-sort', {
                      'fa-sort-up': sortDied,
                      'fa-sort-down': descSort,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {getPreparedPeople(people, { sortField, descending }).map(person => (
          <PersonLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};

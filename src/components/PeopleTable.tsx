import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const headers = [
  { label: 'Name', column: 'name', hasIcon: true },
  { label: 'Sex', column: 'sex', hasIcon: true },
  { label: 'Born', column: 'born', hasIcon: true },
  { label: 'Died', column: 'died', hasIcon: true },
  { label: 'Mother', column: 'mother', hasIcon: false },
  { label: 'Father', column: 'father', hasIcon: false },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (sort === column && !order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortingIconClass = (
    column: string,
    columnParam: string | null,
    orderParam: string | null,
  ) => {
    return classNames('fas', {
      'fa-sort': columnParam !== column || !columnParam,
      'fa-sort-up': columnParam === column && !orderParam,
      'fa-sort-down': columnParam === column && orderParam,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header.label}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header.label}
                {header.hasIcon && (
                  <SearchLink params={getSortParams(header.column)}>
                    <span className="icon">
                      <i
                        className={sortingIconClass(header.column, sort, order)}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink key={person.name} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};

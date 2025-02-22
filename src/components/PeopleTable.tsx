import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const tableField = ['Name', 'Sex', 'Born', 'Died'];

  const handleSort = (selectedSort: string) => {
    if (selectedSort !== sort) {
      return { sort: selectedSort, order: null };
    }

    if (selectedSort === sort && !order) {
      return { sort: selectedSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableField.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field}
                <SearchLink params={handleSort(field.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': field.toLowerCase() !== sort,
                        'fa-sort-up': field.toLowerCase() === sort && !order,
                        'fa-sort-down': field.toLowerCase() === sort && order,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

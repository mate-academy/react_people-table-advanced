import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

const columns = [
  { title: 'Name', sortField: 'name' },
  { title: 'Sex', sortField: 'sex' },
  { title: 'Born', sortField: 'born' },
  { title: 'Died', sortField: 'died' },
];

interface Props {
  peoples: Person[];
  selectedSlug?: string;
}

export const PeopleTable: React.FC<Props> = ({ peoples, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getNextSortParams = (field: string) => {
    const params: Record<string, string | null> = {};

    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      params.sort = field;
      return params;
    }

    if (currentOrder === 'desc') {
      params.sort = null;
      params.order = null;
      return params;
    }

    params.sort = field;
    params.order = 'desc';
    return params;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.sortField}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.title}
                <SearchLink
                  params={getNextSortParams(column.sortField)}
                  className="ml-1"
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': currentSort !== column.sortField,
                        'fa-sort-up':
                          currentSort === column.sortField &&
                          currentOrder !== 'desc',
                        'fa-sort-down':
                          currentSort === column.sortField &&
                          currentOrder === 'desc',
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
        {peoples.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': selectedSlug === person.slug,
            })}
          >
            <td>
              <PersonLink personName={person.name} peoples={peoples} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                <PersonLink personName={person.motherName} peoples={peoples} />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink personName={person.fatherName} peoples={peoples} />
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

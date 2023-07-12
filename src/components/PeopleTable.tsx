import React from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  order: string | null;
  sort: string | null;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  sort,
  order,
}) => {
  const { slug = '' } = useParams();

  const handleSorting = (value: string) => {
    switch (true) {
      case sort !== value:
        return {
          sort: value,
          order: null,
        };
      case sort === value && order === null:
        return {
          sort: value,
          order: 'desc',
        };
      default:
        return {
          sort: null,
          order: null,
        };
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink params={handleSorting(column.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={classnames('fas', {
                        'fa-sort': sort !== column.toLowerCase(),
                        'fa-sort-up': sort === column
                          .toLowerCase() && order === null,
                        'fa-sort-down': sort === column
                          .toLowerCase() && order === 'desc',
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
          <PersonInfo
            key={person.slug}
            person={person}
            selectedPersonSlug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};

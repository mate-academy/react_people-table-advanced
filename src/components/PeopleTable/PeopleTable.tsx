import React, { memo, useCallback } from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

const sortingFields = ['name', 'sex', 'born', 'died'];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = memo(({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSortOrder = useCallback(
    (sortingField: string) => {
      if (sort !== sortingField) {
        return { sort: sortingField, order: null };
      }

      if (!order) {
        return { sort: sortingField, order: 'desc' };
      }

      return { sort: null, order: null };
    },
    [sort, order],
  );

  const getParent = useCallback(
    (parentName: string | null) =>
      people.find(person => person.name === parentName),
    [people],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortingFields.map(sortingField => (
            <th key={sortingField}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortingField.charAt(0).toUpperCase() + sortingField.slice(1)}
                <SearchLink params={handleSortOrder(sortingField)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== sortingField,
                        'fa-sort-up': sort === sortingField && !order,
                        'fa-sort-down': sort === sortingField && order,
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
          <PersonItem key={person.slug} person={person} getParent={getParent} />
        ))}
      </tbody>
    </table>
  );
});

PeopleTable.displayName = 'PeopleTable';

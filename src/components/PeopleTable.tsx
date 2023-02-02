import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { sortFields } from '../types/PeopleSortFields';
import { SearchLink } from './SearchLink';

type Props = {
  visiblePeople: Person[],
  sort: string | null,
  order: string | null,
};

export const PeopleTable: React.FC<Props> = memo(({
  visiblePeople,
  sort,
  order,
}) => {
  const { slug } = useParams();

  const onChangeSortParams = useCallback(
    (sortName: string) => {
      if (sort !== sortName) {
        return { sort: sortName, order: null };
      }

      if (sort === sortName && !order) {
        return { sort: sortName, order: 'desc' };
      }

      return { sort: null, order: null };
    },
    [sort, order],
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(sortField => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {
                  sortField.fieldName[0]
                    .toUpperCase() + sortField.fieldName.slice(1)
                }
                <SearchLink
                  params={onChangeSortParams(sortField.fieldName)}
                >
                  <span className="icon">
                    <i
                      className={cn('fas',
                        {
                          'fa-sort': sortField.fieldName !== sort,
                        },
                        {
                          'fa-sort-up': sortField.fieldName === sort
                                && !order,
                        },
                        {
                          'fa-sort-down': sortField.fieldName === sort
                                && order,
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
        {visiblePeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother
                ? <PersonLink person={person.mother} />
                : person.motherName || '-'}
            </td>
            <td>
              {person.father
                ? <PersonLink person={person.father} />
                : person.fatherName || '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

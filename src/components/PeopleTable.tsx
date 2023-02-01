import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { sortFields } from '../types/PeopleSortFields';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  // const query = searchParams.get('query');
  // const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  // const century = searchParams.getAll('century');

  const onChangeSortParams = (sortName: string) => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    }

    if (sort === sortName && !order) {
      return { sort: sortName, order: 'desc' };
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
          {sortFields.map(sortField => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {
                  sortField.fieldName[0]
                    .toUpperCase() + sortField.fieldName.slice(1)
                }
                <SearchLink params={onChangeSortParams(sortField.fieldName)}>
                  <span className="icon">
                    <i
                      className={cn('fas',
                        {
                          'fa-sort': sortField.fieldName !== sort,
                        },
                        {
                          'fa-sort-up': sortField.fieldName === sort && !order,
                        },
                        {
                          'fa-sort-down': sortField.fieldName === sort && order,
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
};

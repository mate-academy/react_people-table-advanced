/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';

import { sortTypes } from './../../constants/constants';

import { PersonLink, SearchLink } from '../';

interface Props {
  people: Person[];
  sort: string | null;
  order: string | null;
}
export const PeopleTable: FC<Props> = memo(({ people, sort, order }) => {
  const { slug } = useParams();

  const getSortParams = (sortBy: string) => {
    if (sortBy === sort && !order) {
      return { sort: sortBy, order: 'desk' };
    }

    if (sortBy !== sort && !order) {
      return { sort: sortBy, order: null };
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
          {sortTypes.map(sortType => (
            <th key={sortType.value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortType.title}
                <SearchLink params={getSortParams(sortType.value)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sortType.value !== sort,
                        'fa-sort-up': sortType.value === sort && !order,
                        'fa-sort-down': sortType.value === sort && order,
                      })}
                    />
                  </span>
                </SearchLink>
                <a href="#/people?sort=name"></a>
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
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

PeopleTable.displayName = 'PeopleTable';

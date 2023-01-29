import React from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { sortTypes } from './PeopleSortTypes';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[],
  sort: string | null,
  order: string | null,
};

export const PeopleTable:React.FC<Props> = React.memo(({
  people,
  sort,
  order,
}) => {
  const { slug } = useParams();

  const getSortParams = (sortBy: string) => {
    if (sortBy === sort && !order) {
      return { sort: sortBy, order: 'desc' };
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
            <th key={sortType.id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortType.title}
                <SearchLink params={getSortParams(sortType.value)}>
                  <span className="icon">
                    <i className={cn(
                      'fas',
                      { 'fa-sort': sortType.value !== sort },
                      { 'fa-sort-up': sortType.value === sort && !order },
                      { 'fa-sort-down': sortType.value === sort && order },
                    )}
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
              'has-background-warning': slug === person.slug,
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

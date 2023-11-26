import React, { useMemo } from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type Sort = {
  sortBy: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedSlug } = useParams();
  const [searchParams] = useSearchParams();

  const currentSort: Sort = useMemo(() => {
    return {
      sortBy: searchParams.get('sort'),
      order: searchParams.get('order'),
    };
  }, [searchParams]);

  const getParent = (name: string | null): Person | undefined => {
    return name ? people.find(person => person.name === name) : undefined;
  };

  const sorts = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sorts.map(sort => {
            const sortLower = sort.toLowerCase();

            return (
              <th key={sortLower}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sort}
                  <SearchLink
                    params={{
                      sort: sortLower === currentSort.sortBy
                      && currentSort.order === 'desc' ? null : sortLower,
                      order: sortLower === currentSort.sortBy
                      && currentSort.order !== 'desc' ? 'desc' : null,
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          {
                            'fa-sort': currentSort.sortBy !== sortLower,
                            'fa-sort-up': currentSort.sortBy === sortLower
                            && !currentSort.order,
                            'fa-sort-down': currentSort.sortBy === sortLower
                            && currentSort.order,
                          },
                        )}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = getParent(person.motherName);
          const father = getParent(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn(
                { 'has-background-warning': person.slug === selectedSlug },
              )}
            >
              <td>
                <a href={`#/people/${person.slug}`}>
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

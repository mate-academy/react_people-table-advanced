import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { sortParams } from '../../layoutData/sortParams';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';
import { TablePerson } from '../TablePerson';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = (
  {
    people,
  },
) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const setSortingParams = (sortBy: string) => {
    if (sort === null || sort !== sortBy) {
      return {
        sort: sortBy,
        order: null,
      };
    }

    if (sort === sortBy && order === null) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  if (people.length === 0) {
    return (
      <p>
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortParams.map(sortParam => {
            const { title, sortBy } = sortParam;

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink
                    params={setSortingParams(sortBy)}
                  >
                    <span className="icon">
                      <i className={classNames(
                        'fas',
                        {
                          'fa-sort': !sort || sort !== sortBy,
                          'fa-sort-up': sort === sortBy && !order,
                          'fa-sort-down': sort === sortBy && order,
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
        {people.map(person => (
          <TablePerson
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};

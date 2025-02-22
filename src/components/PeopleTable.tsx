import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import cn from 'classnames';
import { Person, SexFilter } from '../types';
import { PeopleLink } from './PeopleLink';
import { getSearchWith } from '../utils/getSearchWith';
import { Sort } from '../types/Sort';
import { getFilteredPeople } from '../utils/getFiltered';

type Props = {
  people: Person[];
};

const sortTypes = [
  { sortBy: Sort.Name, sortName: 'Name' },
  { sortBy: Sort.Sex, sortName: 'Sex' },
  { sortBy: Sort.Born, sortName: 'Born' },
  { sortBy: Sort.Died, sortName: 'Died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || SexFilter.All;
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = getFilteredPeople(people, {
    sort,
    order,
    query,
    sex,
    centuries,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortTypes.map(type => (
            <th key={type.sortBy}>
              <span className="is-flex is-flex-wrap-nowrap">
                {type.sortName}
                <Link
                  to={{
                    search: getSearchWith(
                      {
                        sort:
                          type.sortBy === sort && order === 'desc'
                            ? null
                            : type.sortBy,
                        order:
                          type.sortBy === sort
                            ? order === 'desc'
                              ? null
                              : 'desc'
                            : null,
                      },
                      searchParams,
                    ),
                  }}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': type.sortBy !== sort,
                        'fa-sort-up': sort === type.sortBy && !order,
                        'fa-sort-down':
                          sort === type.sortBy && order === 'desc',
                      })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PeopleLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};

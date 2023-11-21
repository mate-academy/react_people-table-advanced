import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSortingParams } from '../helpers/getSortingParams';
import { Sort } from '../types/Sort';
import { Person } from '../types';

import { PeopleRow } from './PeopleRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Sort).map(([key, value]) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={getSortingParams(sort, order, value)}
                >
                  <span className="icon">
                    <i
                      className={cn('fas', {
                        'fa-sort': sort !== value,
                        'fa-sort-up': sort === value && !order,
                        'fa-sort-down': sort === value && order,
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
          <PeopleRow
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};

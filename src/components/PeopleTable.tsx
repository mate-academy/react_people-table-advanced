import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  people: Person[];
}

const SORT_PARAMS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  let sortedPeople = [...people];

  sortedPeople = sortedPeople.sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return a[sort].localeCompare(b[sort]);

      case 'born':
      case 'died':
        return a[sort] - b[sort];

      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedPeople = sortedPeople.reverse();
  }

  const getSortParams = (param: string) => {
    return {
      sort: param === sort && isReversed ? null : param,
      order: param === sort && !isReversed ? 'desc' : null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {!!sortedPeople.length && (
        <thead>
          <tr>
            {SORT_PARAMS.map(it => (
              <th key={it}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {it}
                  <SearchLink params={getSortParams(it.toLowerCase())}>
                    <span className="icon">
                      <i className={cn('fas', {
                        'fa-sort': it.toLowerCase() !== sort,
                        'fa-sort-up': it.toLowerCase() === sort && !isReversed,
                        'fa-sort-down': it.toLowerCase() === sort && isReversed,
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
      )}

      <tbody>
        {sortedPeople.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

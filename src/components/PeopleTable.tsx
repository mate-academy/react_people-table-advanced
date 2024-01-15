import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

// /* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  people: Person[]
}

const SORT_PARAMS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  let sortedPeople = [...people];

  sortedPeople = sortedPeople.sort((a, b) => {
    switch (sort) {
      case 'name':
        return a.name.localeCompare(b.name);

      case 'born':
        return a.born - b.born;

      case 'died':
        return a.died - b.died;

      default:
        return 0;
    }
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_PARAMS.map(param => (
            <th key={param}>
              <span className="is-flex is-flex-wrap-nowrap">
                {param}
                <SearchLink params={{ sort: param.toLowerCase() }}>
                  <span className="icon">
                    <i className="fas fa-sort" />
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
        {sortedPeople.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

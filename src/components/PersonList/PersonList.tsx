import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../Person/PersonLink';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[],
}

const SORT_FIELDS = ['Name', 'Sex', 'Born', 'Died'];

export const PersonList: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  if (!people.length) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_FIELDS.map(field => {
            const params = {
              sort: (field === sortField && isReversed) ? null : field,
              order: (field === sortField && !isReversed) ? 'desc' : null,
            };

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {field}
                  <SearchLink
                    params={params}
                  >
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': sortField !== field,
                        'fa-sort-up': sortField === field && !isReversed,
                        'fa-sort-down': sortField === field && isReversed,
                      })}
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
          return (
            <PersonLink key={person.slug} person={person} />
          );
        })}

      </tbody>
    </table>
  );
};

import classNames from 'classnames';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { UpdatePerson } from '../types/UpdatePerson';
import { PersonTable } from './PersonTable';
import { SearchLink } from './SearchLink';

type Props = {
  people: UpdatePerson[],
};

const headerColumn = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = React.memo(({ people }) => {
  const { personSlug = '' } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headerColumn.map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column}
                <SearchLink
                  params={{
                    sort: sort === column && order
                      ? null
                      : column,
                    order: sort === column && !order
                      ? 'desc'
                      : null,
                  }}
                >
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== column,
                      'fa-sort-up': sort === column && !order,
                      'fa-sort-down': sort === column && order,
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
          <PersonTable
            key={person.slug}
            person={person}
            personSlug={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
});

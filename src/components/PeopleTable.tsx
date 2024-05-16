import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { PersonItem } from './PersonItem';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

const sortFields = ['name', 'sex', 'born', 'died'];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const visiblePeople = getFilteredPeople(
    people,
    query,
    sex,
    centuries,
    sort,
    order,
  );

  const getIconClass = (sortParam: string) =>
    classNames('fas', {
      'fa-sort': sort !== sortParam,
      'fa-sort-up': sort === sortParam && !order,
      'fa-sort-down': sort === sortParam && !!order,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.replace(/^./, field[0].toUpperCase())}
                <SearchLink
                  params={{
                    sort: !order || sort !== field ? field : null,
                    order: !order && sort === field ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i className={getIconClass(field)} />
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
        {visiblePeople.map(person => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};

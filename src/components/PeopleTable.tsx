import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortBy } from '../types/Filters';
import classNames from 'classnames';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const fiteredPeople = getFilteredPeople(
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
      'fa-sort-down': sort === sortParam && order,
    });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortBy).map(([filterTitle, filter]) => (
            <th key={filter}>
              <span className="is-flex is-flex-wrap-nowrap">
                {filterTitle}
                <SearchLink
                  params={{
                    sort: !order || sort !== filter ? filter : null,
                    order: !order && sort === filter ? 'desc' : null,
                  }}
                >
                  <span className="icon">
                    <i className={getIconClass(filter)} />
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
        {fiteredPeople.map(person => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { sex, born, died, motherName, fatherName, slug } = person;

          const mother = people.find(p => p.name === motherName);

          const father = people.find(p => p.name === fatherName);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({ 'has-background-warning': personSlug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

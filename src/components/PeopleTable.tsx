import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { TableHeaders } from '../utils/filterHelpers';
import { SearchLink } from './SearchLink';
import { getFilteredPeople } from '../utils/getFilteredPeople';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = getFilteredPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TableHeaders.map(header => {
            const headerKey = header.toLowerCase();

            return (
              <th key={headerKey}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <SearchLink
                    params={{
                      sort:
                        sort === headerKey && order === 'desc'
                          ? null
                          : headerKey,
                      order:
                        sort === headerKey
                          ? order === 'desc'
                            ? null
                            : 'desc'
                          : 'asc',
                    }}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          { 'fa-sort': sort !== headerKey },
                          {
                            'fa-sort-up': sort === headerKey && order === 'asc',
                          },
                          {
                            'fa-sort-down':
                              sort === headerKey && order === 'desc',
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
        {filteredPeople.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': slug === person.slug })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

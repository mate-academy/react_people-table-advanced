import React from 'react';
import { Person } from '../types/Person';
import cn from 'classnames';
import { SearchLink } from '../components/SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { useParams, useLocation } from 'react-router-dom';

const SORT_FIELDS = ['name', 'sex', 'born', 'died'];

type Props = {
  persons: Person[];
  PersonLinkComponent: React.FC<{ person: Person | null }>;
  getPersonByName: (name: string | null) => Person | null;
};

export const PeopleTable: React.FC<Props> = ({
  persons,
  PersonLinkComponent,
  getPersonByName,
}) => {
  const { slug } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  if (persons.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_FIELDS.map(field => {
            const isCurrentSort = currentSort === field;
            const isDesc = currentOrder === 'desc';

            let nextSort: SearchParams['sort'] = field;
            let nextOrder: SearchParams['order'] = null;

            if (isCurrentSort && !isDesc) {
              nextOrder = 'desc';
            } else if (isCurrentSort && isDesc) {
              nextSort = null;
              nextOrder = null;
            }

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap is-align-items-center">
                  {field[0].toUpperCase() + field.slice(1)}

                  <SearchLink
                    params={{
                      sort: nextSort,
                      order: nextOrder,
                    }}
                  >
                    <span className="icon ml-1">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isCurrentSort,
                          'fa-sort-up': isCurrentSort && !isDesc,
                          'fa-sort-down': isCurrentSort && isDesc,
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
        {persons.map((person: Person) => (
          <tr
            key={person.name}
            data-cy="person"
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLinkComponent person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            <td>
              {person.motherName ? (
                getPersonByName(person.motherName) ? (
                  <PersonLinkComponent
                    person={getPersonByName(person.motherName)}
                  />
                ) : (
                  <span>{person.motherName}</span>
                )
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.fatherName ? (
                getPersonByName(person.fatherName) ? (
                  <PersonLinkComponent
                    person={getPersonByName(person.fatherName)}
                  />
                ) : (
                  <span>{person.fatherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

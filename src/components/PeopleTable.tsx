import React from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function handleSort(field: string) {
    const isCurrentField = sort === field;
    const isAscending = !order; // order отсутствует => asc
    const params = new URLSearchParams(searchParams);

    if (!isCurrentField) {
      params.set('sort', field);
      params.delete('order');
    } else if (isAscending) {
      params.set('sort', field);
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            <span className="is-flex is-align-items-center">
              Name
              <span className="icon is-small ml-2">
                {sort === 'name' ? (
                  order === 'desc' ? (
                    <i className="fas fa-sort-down" />
                  ) : (
                    <i className="fas fa-sort-up" />
                  )
                ) : (
                  <i className="fas fa-sort" />
                )}
              </span>
            </span>
          </th>

          <th onClick={() => handleSort('sex')}>
            <span className="is-flex is-align-items-center">
              Sex
              <span className="icon is-small ml-2">
                {sort === 'sex' ? (
                  order === 'desc' ? (
                    <i className="fas fa-sort-down" />
                  ) : (
                    <i className="fas fa-sort-up" />
                  )
                ) : (
                  <i className="fas fa-sort" />
                )}
              </span>
            </span>
          </th>

          <th onClick={() => handleSort('born')}>
            <span className="is-flex is-align-items-center">
              Born
              <span className="icon is-small ml-2">
                {sort === 'born' ? (
                  order === 'desc' ? (
                    <i className="fas fa-sort-down" />
                  ) : (
                    <i className="fas fa-sort-up" />
                  )
                ) : (
                  <i className="fas fa-sort" />
                )}
              </span>
            </span>
          </th>

          <th onClick={() => handleSort('died')}>
            <span className="is-flex is-align-items-center">
              Died
              <span className="icon is-small ml-2">
                {sort === 'died' ? (
                  order === 'desc' ? (
                    <i className="fas fa-sort-down" />
                  ) : (
                    <i className="fas fa-sort-up" />
                  )
                ) : (
                  <i className="fas fa-sort" />
                )}
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
            people={people}
            personSlug={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};

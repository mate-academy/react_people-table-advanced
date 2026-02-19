/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSlugByName = (name: string | null) => {
    if (!name) {
      return null;
    }

    const person = people.find(p => p.name === name);

    return person ? person.slug : null;
  };

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'sex', label: 'Sex' },
    { id: 'born', label: 'Born' },
    { id: 'died', label: 'Died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ id, label }) => (
            <th key={id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(id)}>
                  <span className="icon">
                    <i
                      className={`fas fa-sort${
                        sort === id ? (order === 'desc' ? '-down' : '-up') : ''
                      }`}
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
        {people.map(person => {
          const motherSlug = getSlugByName(person.motherName);
          const fatherSlug = getSlugByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                personSlug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <SearchLink
                  to={`/people/${person.slug}`}
                  params={{}}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <SearchLink
                      to={`/people/${motherSlug}`}
                      params={{}}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </SearchLink>
                  ) : (
                    <span className="has-text-danger">{person.motherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <SearchLink to={`/people/${fatherSlug}`} params={{}}>
                      {person.fatherName}
                    </SearchLink>
                  ) : (
                    <span>{person.fatherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

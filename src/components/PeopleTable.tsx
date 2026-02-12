import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const findPersonByName = (name: string | null) => {
    return people.find(p => p.name === name);
  };

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order === null) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={getSortIcon(field)} />
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
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                personSlug === person.slug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

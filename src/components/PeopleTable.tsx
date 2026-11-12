import React from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personId } = useParams();

  const sortField = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: null };
    }

    if (!sortOrder) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const findPersonByName = (name: string | null, allPeople: Person[]) => {
    if (!name) {
      return null;
    }

    return allPeople.find(p => p.name === name);
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return 'fas fa-sort';
    }

    if (!sortOrder) {
      return 'fas fa-sort-up';
    }

    return 'fas fa-sort-down';
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
          const isSelected = person.slug === personId;

          const mother = findPersonByName(person.motherName, people);
          const father = findPersonByName(person.fatherName, people);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <SearchLink
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  params={{}}
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.name}
                </SearchLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <SearchLink
                    className={mother.sex === 'f' ? 'has-text-danger' : ''}
                    params={{}}
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.motherName}
                  </SearchLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <SearchLink
                    className={father.sex === 'f' ? 'has-text-danger' : ''}
                    params={{}}
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: searchParams.toString(),
                    }}
                  >
                    {person.fatherName}
                  </SearchLink>
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

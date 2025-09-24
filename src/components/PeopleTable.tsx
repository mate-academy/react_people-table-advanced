/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

const findPersonByName = (name: string, people: Person[]) => {
  return people.find(p => p.name === name);
};

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  selectedSlug,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // 🔽 ZNORMALIZOWANY STRING Z PARAMETRAMI 🔽
  const searchString = searchParams.toString();
  const normalizedSearch = searchString ? `?${searchString}` : '';

  const getSortParams = (fieldName: string): SearchParams => {
    if (sort !== fieldName) {
      return { sort: fieldName, order: null };
    }

    if (order !== 'desc') {
      return { sort: fieldName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (fieldName: string) => {
    if (sort !== fieldName) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const getRowClass = (slug: string) => {
    return slug === selectedSlug ? 'has-background-warning' : '';
  };

  const getPersonLinkClass = (sex: 'm' | 'f') => {
    return sex === 'f' ? 'has-text-danger' : '';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as const).map(field => (
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
          const mother = person.motherName
            ? findPersonByName(person.motherName, allPeople)
            : null;

          const father = person.fatherName
            ? findPersonByName(person.fatherName, allPeople)
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={getRowClass(person.slug)}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: normalizedSearch,
                  }}
                  className={getPersonLinkClass(person.sex)}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: normalizedSearch,
                    }}
                    className={getPersonLinkClass(mother.sex)}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: normalizedSearch,
                    }}
                    className={getPersonLinkClass(father.sex)}
                  >
                    {father.name}
                  </Link>
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

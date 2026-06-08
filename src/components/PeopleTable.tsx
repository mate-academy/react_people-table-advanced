/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { Person } from '../types';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  // Реалізація логіки 3-х кліків (asc -> desc -> вимкнено)
  const getSortParams = (columnName: string) => {
    if (currentSort !== columnName) {
      return { sort: columnName, order: null }; // перший клік: порядок за замовчуванням (asc)
    }

    if (currentOrder !== 'desc') {
      return { sort: columnName, order: 'desc' }; // другий клік: desc
    }

    return { sort: null, order: null }; // третій клік: вимкнути сортування
  };

  const getSortIcon = (columnName: string) => {
    if (currentSort !== columnName) {
      return 'fas fa-sort';
    }

    return currentOrder === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === slug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isSelected ? 'is-selected has-background-warning' : ''}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName && person.mother?.slug ? (
                  <Link
                    to={{
                      pathname: `/people/${person.mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
                    data-cy="mother"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              {/* Стовпчик Father */}
              <td>
                {person.fatherName && person.father?.slug ? (
                  <Link
                    to={{
                      pathname: `/people/${person.father.slug}`,
                      search: searchParams.toString(),
                    }}
                    data-cy="father"
                  >
                    {person.fatherName}
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

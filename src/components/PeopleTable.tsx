import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useFilters } from '../store/FiltersContext';
import { getSearchWith } from '../utils/searchHelper';
import { SortField } from '../types/FiltersContextType';

type Props = {
  peoples: Person[];
};

export const PeopleTable: React.FC<Props> = React.memo(({ peoples }) => {
  const [searchParams] = useSearchParams();
  const filters = useFilters();
  const { slug } = useParams();
  const validActivePerson = slug ? slug.toString() : '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortField).map(sortField => {
            const sortToLower = sortField.toLowerCase();
            const isCurrentSort = filters.sort === sortToLower;
            const isDesc = filters.order === 'desc';

            return (
              <th key={sortField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortField}
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: isCurrentSort
                          ? isDesc
                            ? null
                            : sortToLower
                          : sortToLower,
                        order: isCurrentSort ? (isDesc ? null : 'desc') : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`${
                          isCurrentSort
                            ? isDesc
                              ? 'fas fa-sort-down'
                              : 'fas fa-sort-up'
                            : 'fas fa-sort'
                        }`}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(people => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            mother,
            father,
          } = people;

          return (
            <tr
              data-cy="person"
              key={people.slug}
              className={
                people.slug === validActivePerson
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <Link
                  className={sex === 'f' ? 'has-text-danger' : ''}
                  to={{
                    pathname: `../${people.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              {mother && motherName !== null ? (
                <td>
                  {motherName !== null ? (
                    <Link
                      className="has-text-danger"
                      to={{
                        pathname: `../${mother.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {motherName}
                    </Link>
                  ) : (
                    '-'
                  )}
                </td>
              ) : (
                <td>{motherName !== null ? motherName : '-'}</td>
              )}

              {father && fatherName !== null ? (
                <td>
                  {fatherName !== null ? (
                    <Link
                      to={{
                        pathname: `../${father.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {fatherName}
                    </Link>
                  ) : (
                    '-'
                  )}
                </td>
              ) : (
                <td>{fatherName !== null ? fatherName : '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

PeopleTable.displayName = 'PeopleTable';

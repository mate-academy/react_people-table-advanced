import React, { useState } from 'react';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

type PeopleTableProps = {
  people: Person[];
  selectedSlug: string;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedSlug,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  const queryParams = new URLSearchParams(location.search);
  const initialSortField = queryParams.get('sort');
  const initialSortOrder = queryParams.get('order') as 'asc' | 'desc' | null;

  React.useEffect(() => {
    if (initialSortField) {
      setSortField(initialSortField);
      setSortOrder(initialSortOrder);
    }
  }, [initialSortField, initialSortOrder]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  React.useEffect(() => {
    if (sortField) {
      const searchParams = new URLSearchParams();

      searchParams.set('sort', sortField);
      if (sortOrder) {
        searchParams.set('order', sortOrder);
      }

      navigate({ search: searchParams.toString() });
    } else {
      navigate({ search: '' });
    }
  }, [sortField, sortOrder, navigate]);

  const sortedPeople = [...people];

  if (sortField && sortOrder) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person];
      const bValue = b[sortField as keyof Person];

      if (aValue === null || aValue === undefined) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      if (bValue === null || bValue === undefined) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  const generateSlug = (name: string, born: number): string => {
    return `${name.toLowerCase().replace(/\s+/g, '-')}-${born}`;
  };

  const findMotherBorn = (motherName: string): number | null => {
    const mother = people.find(p => p.name === motherName);

    return mother ? mother.born : null;
  };

  const findFatherBorn = (fatherName: string): number | null => {
    const father = people.find(p => p.name === fatherName);

    return father ? father.born : null;
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
              <SearchLink
                params={{
                  sort: 'name',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort-up':
                        sortField === 'name' && sortOrder === 'asc',
                      'fas fa-sort-down':
                        sortField === 'name' && sortOrder === 'desc',
                      'fas fa-sort': !sortField || sortField !== 'name',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{
                  sort: 'sex',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort-up':
                        sortField === 'sex' && sortOrder === 'asc',
                      'fas fa-sort-down':
                        sortField === 'sex' && sortOrder === 'desc',
                      'fas fa-sort': !sortField || sortField !== 'sex',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{
                  sort: 'born',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort-up':
                        sortField === 'born' && sortOrder === 'asc',
                      'fas fa-sort-down':
                        sortField === 'born' && sortOrder === 'desc',
                      'fas fa-sort': !sortField || sortField !== 'born',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{
                  sort: 'died',
                  order: sortOrder === 'asc' ? 'desc' : 'asc',
                }}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i
                    className={classNames({
                      'fas fa-sort-up':
                        sortField === 'died' && sortOrder === 'asc',
                      'fas fa-sort-down':
                        sortField === 'died' && sortOrder === 'desc',
                      'fas fa-sort': !sortField || sortField !== 'died',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.some(p => p.name === person.motherName) ? (
                  <a
                    href={`#/people/${generateSlug(person.motherName, findMotherBorn(person.motherName) || person.born)}`}
                    data-cy="mother-link"
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </a>
                ) : (
                  <span>{person.motherName}</span>
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.some(p => p.name === person.fatherName) ? (
                  <a
                    href={`#/people/${generateSlug(person.fatherName, findFatherBorn(person.fatherName) || person.born)}`}
                    data-cy="father-link"
                  >
                    {person.fatherName}
                  </a>
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

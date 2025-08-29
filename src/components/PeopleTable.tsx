/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchParams } from '../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
  sort: string | null;
  order: string | null;
  onSort: (params: SearchParams) => void;
}

export const PeopleTable = ({
  people,
  sort,
  order,
  onSort,
}: PeopleTableProps) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const slug = location.pathname.split('/').pop();

    setSelectedPerson(slug || null);
  }, [location.pathname]);

  const handleSort = useCallback(
    (field: string) => {
      if (sort === field) {
        if (order === 'desc') {
          // Third click - remove sorting
          onSort({ sort: null, order: null });
        } else {
          // Second click - sort desc
          onSort({ sort: field, order: 'desc' });
        }
      } else {
        // First click - sort asc
        onSort({ sort: field, order: null });
      }
    },
    [sort, order, onSort],
  );

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
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedPerson === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <Link
                className={person.sex === 'f' ? 'has-text-danger' : ''}
                to={`/people/${person.slug}`}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {!person.motherName && '-'}
              {person.motherName && !person.mother && person.motherName}
              {person.motherName && person.mother && (
                <Link
                  className="has-text-danger"
                  to={`/people/${person.mother.slug}`}
                >
                  {person.motherName}
                </Link>
              )}
            </td>
            <td>
              {!person.fatherName && '-'}
              {person.fatherName && !person.father && person.fatherName}
              {person.fatherName && person.father && (
                <Link to={`/people/${person.father.slug}`}>
                  {person.fatherName}
                </Link>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

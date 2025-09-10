/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchParams } from '../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
  sort: string | null;
  order: string | null;
  onSort: (params: SearchParams) => void;
}

// Lista de campos permitidos para ordenação
const ALLOWED_SORT_FIELDS = ['name', 'sex', 'born', 'died'];

export const PeopleTable = ({
  people,
  sort,
  order,
  onSort,
}: PeopleTableProps) => {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const location = useLocation();
  const { slug } = useParams();

  useEffect(() => {
    setSelectedPerson(slug || null);
  }, [slug]);

  const handleSort = useCallback(
    (field: string) => {
      // Validar se o campo é permitido para ordenação
      if (!ALLOWED_SORT_FIELDS.includes(field)) {
        return;
      }

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
              <button
                type="button"
                className="button is-small is-text"
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-small is-text"
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-small is-text"
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-small is-text"
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </button>
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
                to={`/people/${person.slug}${location.search}`}
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
                  to={`/people/${person.mother.slug}${location.search}`}
                >
                  {person.motherName}
                </Link>
              )}
            </td>
            <td>
              {!person.fatherName && '-'}
              {person.fatherName && !person.father && person.fatherName}
              {person.fatherName && person.father && (
                <Link to={`/people/${person.father.slug}${location.search}`}>
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

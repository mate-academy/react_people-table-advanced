import { useLocation, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  sort: string;
  order: string;
  onSortChange: (sort: string) => void;
  selectedSlug?: string;
};

export const PeopleTable = ({
  people,
  sort,
  order,
  onSortChange,
  selectedSlug,
}: Props) => {
  const location = useLocation();

  const peopleByName = useMemo(() => {
    const dict: { [key: string]: Person } = {};

    people.forEach(person => {
      dict[person.name.toLowerCase().trim()] = person;
    });

    return dict;
  }, [people]);

  const findPerson = (name: string | null) => {
    if (!name || name.trim() === '' || name === '-') {
      return null;
    }

    const foundPerson = peopleByName[name.toLowerCase().trim()];

    return foundPerson || null;
  };

  const getSortIcon = (column: string) => {
    if (sort !== column) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const handleSortClick = (column: string) => {
    onSortChange(column);
  };

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">No people</p>;
  }

  return (
    <div className="table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {['name', 'sex', 'born', 'died'].map(column => (
              <th key={column}>
                <span
                  className="is-flex
                is-flex-wrap-nowrap
                is-align-items-center"
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSortClick(column)}
                    onKeyDown={e =>
                      e.key === 'Enter' && handleSortClick(column)
                    }
                    className="icon"
                  >
                    <i className={getSortIcon(column)} />
                  </span>
                </span>
              </th>
            ))}
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {people.map(person => {
            const mother = findPerson(person.motherName);
            const father = findPerson(person.fatherName);

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={
                  selectedSlug === person.slug ? 'has-background-warning' : ''
                }
              >
                <td>
                  <Link
                    to={`/people/${person.slug}${location.search}`}
                    className={person.sex === 'f' ? 'has-text-danger' : ''}
                    data-cy="person-link"
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
                      to={`/people/${mother.slug}${location.search}`}
                      className={mother.sex === 'f' ? 'has-text-danger' : ''}
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
                      to={`/people/${father.slug}${location.search}`}
                      className={father.sex === 'f' ? 'has-text-danger' : ''}
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
    </div>
  );
};

import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SortField } from '../utils/peopleHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  people: Person[];
};

const sortColumns: SortField[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const nextParams = new URLSearchParams(searchParams.toString());

    if (sort !== field) {
      nextParams.set('sort', field);
      nextParams.delete('order');
    } else if (order !== 'desc') {
      nextParams.set('order', 'desc');
    } else {
      nextParams.delete('sort');
      nextParams.delete('order');
    }

    setSearchParams(nextParams);
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortColumns.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <button
                  type="button"
                  className="button is-ghost p-0 ml-1"
                  onClick={() => handleSort(field)}
                >
                  <span className="icon">
                    <i className={`fas ${getSortIcon(field)}`} />
                  </span>
                </button>
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
            ? people.find(candidate => candidate.name === person.motherName)
            : null;
          const father = person.fatherName
            ? people.find(candidate => candidate.name === person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                location.pathname === `/people/${person.slug}`
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <Link
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: location.search,
                  }}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <Link
                      className="has-text-danger"
                      to={{
                        pathname: `/people/${mother.slug}`,
                        search: location.search,
                      }}
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <Link
                      to={{
                        pathname: `/people/${father.slug}`,
                        search: location.search,
                      }}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
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

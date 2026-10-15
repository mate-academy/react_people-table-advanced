import { Link, useParams, useSearchParams } from 'react-router-dom';

import type { Person } from '../types/Person';

type Props = {
  people: Person[];
  allPeople: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people, allPeople }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const sortedPeople = [...people];

  if (sort === 'name' || sort === 'sex' || sort === 'born' || sort === 'died') {
    const field = sort;

    sortedPeople.sort((personA, personB) => {
      let result = 0;

      if (field === 'name' || field === 'sex') {
        result = personA[field].localeCompare(personB[field]);
      } else {
        result = personA[field] - personB[field];
      }

      return order === 'desc' ? -result : result;
    });
  }

  const columns: { field: SortField; label: string }[] = [
    { field: 'name', label: 'Name' },
    { field: 'sex', label: 'Sex' },
    { field: 'born', label: 'Born' },
    { field: 'died', label: 'Died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.label}

                <button
                  type="button"
                  className="button is-white is-small"
                  onClick={() => handleSort(column.field)}
                  aria-label={`Sort by ${column.label}`}
                >
                  <span className="icon">
                    <i className={getSortIcon(column.field)} />
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
        {sortedPeople.map(person => {
          const mother = allPeople.find(
            relative => relative.name === person.motherName,
          );

          const father = allPeople.find(
            relative => relative.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
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
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString(),
                    }}
                    className="has-text-danger"
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
                      search: searchParams.toString(),
                    }}
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

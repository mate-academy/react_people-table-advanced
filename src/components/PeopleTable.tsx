import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((a, b) => {
      const aValue = a[sort as keyof Person];
      const bValue = b[sort as keyof Person];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'desc'
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      return order === 'desc'
        ? Number(bValue) - Number(aValue)
        : Number(aValue) - Number(bValue);
    });
  }

  const handleSort = (field: string) => {
    if (sort !== field) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: null }),
      );

      return;
    }

    if (order !== 'desc') {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'desc' }),
      );

      return;
    }

    setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
  };

  const getIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    if (order === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort-up';
  };

  const { slug } = useParams();

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
              <button onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={`fas ${getIcon('name')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={`fas ${getIcon('sex')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={`fas ${getIcon('born')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={`fas ${getIcon('died')}`} />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
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
                    className={mother.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {mother?.name}
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
                    className={father.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {father?.name}
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

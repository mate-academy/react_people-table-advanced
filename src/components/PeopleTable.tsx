import { Person } from '../types';
import { NavLink, useLocation, useSearchParams, Link } from 'react-router-dom';

const colunsNames = [
  { name: 'Name' },
  { name: 'Sex' },
  { name: 'Born' },
  { name: 'Died' },
  { name: 'Mother' },
  { name: 'Father' },
];

type PeopleTableProps = {
  peopleData: Person[];
};

export const PeopleTable = ({ peopleData }: PeopleTableProps) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const sortColumn = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  const sortedPeople = [...peopleData].sort((a, b) => {
    if (!sortColumn || sortOrder === 'none') {
      return 0;
    }

    const valueA = a[sortColumn as keyof Person];
    const valueB = b[sortColumn as keyof Person];

    if (valueA === undefined || valueB === undefined) {
      return 0;
    }

    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {colunsNames.map(colun => (
            <th key={colun.name}>
              <span className="is-flex is-flex-wrap-nowrap">
                {colun.name}
                {colun.name !== 'Mother' && colun.name !== 'Father' && (
                  <Link
                    to={`?sort=${colun.name.toLowerCase()}&order=${
                      sortColumn === colun.name.toLowerCase()
                        ? sortOrder === 'asc'
                          ? 'desc'
                          : sortOrder === 'desc'
                          ? 'none'
                          : 'asc'
                        : 'asc'
                    }`}
                  >
                    <span className="icon">
                      <i
                        className={`fas ${
                          colun.name.toLowerCase() === sortColumn
                            ? sortOrder === 'desc'
                              ? 'fa-sort-down'
                              : 'fa-sort-up'
                            : 'fa-sort'
                        }`}
                      />
                    </span>
                  </Link>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = peopleData.find(p => p.name === person.motherName);
          const father = peopleData.find(p => p.name === person.fatherName);

          const searchParams = new URLSearchParams(location.search);
          const activeSlugFromSearch = searchParams.get('active');
          const isActive =
            location.hash.endsWith(person.slug) ||
            person.slug === activeSlugFromSearch;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={isActive ? 'has-background-warning' : ''}
            >
              <td>
                <NavLink
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: getSearchWith(
                      new URLSearchParams(location.search), {}
                    ),
                  }}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </NavLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <NavLink
                      to={{
                        pathname: `/people/${mother.slug}`,
                        search: getSearchWith(
                          new URLSearchParams(location.search), {}
                        ),
                      }}
                      className={mother.sex === 'f' ? 'has-text-danger' : ''}
                    >
                      {mother.name}
                    </NavLink>
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
                    <NavLink
                      to={{
                        pathname: `/people/${father.slug}`,
                        search: getSearchWith(
                          new URLSearchParams(location.search), {}
                        ),
                      }}
                    >
                      {father.name}
                    </NavLink>
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

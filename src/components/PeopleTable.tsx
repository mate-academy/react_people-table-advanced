import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSlug = searchParams.get('selected');
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries').map(Number);
  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const handleSort = (field: string) => {
    if (sortParam === field) {
      if (orderParam === 'desc') {
        searchParams.delete('sort');
        searchParams.delete('order');
      } else {
        searchParams.set('order', 'desc');
      }
    } else {
      searchParams.set('sort', field);
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const getSortIcon = (field: string) => {
    if (sortParam !== field) {
      return 'fas fa-sort';
    }

    return orderParam === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const filteredPeople = people.filter(person => {
    const matchesQuery = person.name.toLowerCase().includes(searchQuery);
    const matchesSex = !sexFilter || person.sex === sexFilter;
    const personCentury = Math.ceil(person.born / 100);
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  if (filteredPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    const aValue = sortParam ? (a[sortParam as keyof Person] ?? 0) : 0;
    const bValue = sortParam ? (b[sortParam as keyof Person] ?? 0) : 0;

    if (orderParam === 'desc') {
      return aValue < bValue ? 1 : -1;
    }

    return aValue > bValue ? 1 : -1;
  });

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
                params={{ sort: 'name' }}
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={getSortIcon('name')}></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={{ sort: 'sex' }}
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')}></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={{ sort: 'born' }}
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={getSortIcon('born')}></i>
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={{ sort: 'died' }}
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={getSortIcon('died')}></i>
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
              'has-background-warning': person.slug === activeSlug,
            })}
          >
            <td>
              <SearchLink params={{ selected: person.slug }}>
                <span
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </span>
              </SearchLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {person.motherName ? (
              people.some(p => p.name === person.motherName) ? (
                <td>
                  <SearchLink
                    className="has-text-danger"
                    params={{ selected: person.slug }}
                  >
                    {person.motherName}
                  </SearchLink>
                </td>
              ) : (
                <td>{person.motherName}</td>
              )
            ) : (
              <td>-</td>
            )}

            {person.fatherName ? (
              people.some(p => p.name === person.fatherName) ? (
                <td>
                  <SearchLink params={{ selected: person.slug }}>
                    {person.fatherName}
                  </SearchLink>
                </td>
              ) : (
                <td>{person.fatherName}</td>
              )
            ) : (
              <td>-</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

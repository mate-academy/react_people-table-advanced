import { useContext } from 'react';
import { StateContext } from '../../../store';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { Person } from '../../../types';

function mySort(people: Person[], sort?: string, order?: string): Person[] {
  if (!sort) {
    return people;
  }

  return [...people].sort((a, b) => {
    const valueA = a[sort as keyof Person];
    const valueB = b[sort as keyof Person];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'desc'
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'desc' ? valueB - valueA : valueA - valueB;
    }

    return 0;
  });
}

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const { people } = useContext(StateContext);
  const { slug } = useParams();

  const columns = ['Name', 'Sex', 'Born', 'Died'];

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const changeSort = (name: string) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get('sort');
    const currentOrder = params.get('order');
    const newSort = name.toLowerCase();

    if (currentSort !== newSort) {
      return { sort: newSort, order: null };
    }

    if (!currentOrder) {
      return { sort: newSort, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const sortPeople = people.filter(person => {
    const matchesSex = sex ? person.sex === sex : true;
    const matchesQuery = query
      ? person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(query.toLowerCase())) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(query.toLowerCase()))
      : true;

    const personCentury = person.born
      ? Math.ceil(person.born / 100).toString()
      : null;

    const matchesCentury =
      centuries && centuries.length > 0
        ? centuries.includes(personCentury || '')
        : true;

    return matchesSex && matchesQuery && matchesCentury;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(nameColumn => (
            <th key={nameColumn}>
              <span className="is-flex is-flex-wrap-nowrap">
                {nameColumn}
                <SearchLink params={changeSort(nameColumn)}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        searchParams.get('sort')?.toLowerCase() !==
                          nameColumn.toLowerCase()
                          ? 'fa-sort'
                          : searchParams.get('order') === 'desc'
                            ? 'fa-sort-down'
                            : 'fa-sort-up',
                      )}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {mySort(
          sortPeople,
          searchParams.get('sort') || undefined,
          searchParams.get('order') || undefined,
        ).map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames(
                person.slug === slug && 'has-background-warning',
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
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

import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') as keyof Person | null;
  const order = searchParams.get('order') as 'asc' | 'desc' | null;
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const findByName = (name: string) => people.find(p => p.name === name);

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      const matchesQuery =
        !query ||
        person.name.toLowerCase().includes(query) ||
        (person.motherName?.toLowerCase().includes(query) ?? false) ||
        (person.fatherName?.toLowerCase().includes(query) ?? false);

      const matchesSex = !sexFilter || person.sex === sexFilter;
      const personCentury = Math.floor(person.born / 100) + 1 + '';
      const matchesCentury =
        centuries.length === 0 || centuries.includes(personCentury);

      return matchesQuery && matchesSex && matchesCentury;
    });
  }, [people, query, sexFilter, centuries]);

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    return [...filteredPeople].sort((a, b) => {
      let aValue = a[sort] ?? '';
      let bValue = b[sort] ?? '';

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
      }

      if (typeof bValue === 'string') {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return order === 'desc' ? 1 : -1;
      }

      if (aValue > bValue) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }, [filteredPeople, sort, order]);

  const handleSort = (field: keyof Person) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (sort === field) {
      if (order === 'asc') {
        newParams.set('order', 'desc');
      } else if (order === 'desc') {
        newParams.delete('sort');
        newParams.delete('order');
      }
    } else {
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    }

    setSearchParams(newParams);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            Name{''}
            {sort === 'name' ? (
              order === 'asc' ? (
                <i className="fas fa-sort-up"></i>
              ) : (
                <i className="fas fa-sort-down"></i>
              )
            ) : (
              <i className="fas fa-sort"></i>
            )}
          </th>
          <th onClick={() => handleSort('sex')}>
            Sex{''}
            {sort === 'sex' ? (
              order === 'asc' ? (
                <i className="fas fa-sort-up"></i>
              ) : (
                <i className="fas fa-sort-down"></i>
              )
            ) : (
              <i className="fas fa-sort"></i>
            )}
          </th>
          <th onClick={() => handleSort('born')}>
            Born{''}
            {sort === 'born' ? (
              order === 'asc' ? (
                <i className="fas fa-sort-up"></i>
              ) : (
                <i className="fas fa-sort-down"></i>
              )
            ) : (
              <i className="fas fa-sort"></i>
            )}
          </th>
          <th onClick={() => handleSort('died')}>
            Died{''}
            {sort === 'died' ? (
              order === 'asc' ? (
                <i className="fas fa-sort-up"></i>
              ) : (
                <i className="fas fa-sort-down"></i>
              )
            ) : (
              <i className="fas fa-sort"></i>
            )}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = person.motherName
            ? findByName(person.motherName)
            : null;
          const father = person.fatherName
            ? findByName(person.fatherName)
            : null;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
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
